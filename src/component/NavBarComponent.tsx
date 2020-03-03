import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {createStyles, IconButton, Theme, Toolbar, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Close, Search, Menu} from "@material-ui/icons";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles";

type navBarProps = {
    onMenuClick: (drawerHidden: boolean) => void,
    drawerHidden: boolean
};

export default function NavBarComponent(props: navBarProps) {

    let menuClickListener = () => {
        props.onMenuClick(!props.drawerHidden);
    };

    return (
        <div style={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={menuClickListener}>
                        {props.drawerHidden ? (<Menu/>) : (<Close/>)}
                    </IconButton>
                    <Typography variant="h6" style={{
                        flexGrow: 1,
                        paddingRight: "16px"
                    }}>
                        Home
                    </Typography>
                    <SearchComponent/>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
    }),
);

function SearchComponent() {
    const classes = useStyles();
    return (<div className={classes.search}>
        <div className={classes.searchIcon}>
            <Search/>
        </div>
        <InputBase
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
        />
    </div>)
}