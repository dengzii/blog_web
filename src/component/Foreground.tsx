import React from "react";
import {Avatar, createStyles, Divider, Fab, Grid, Theme, Typography, useScrollTrigger, Zoom} from "@material-ui/core";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import NavTabs from "./NavTabs";

const useStyles = makeStyles((theme: Theme) => createStyles({
    scrollTop: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    }
}));

interface Props {
    window?: () => Window;
    children: React.ReactElement;
    topAnchor: string;
}

function BackToTop(props: Props) {
    const {children, window, topAnchor} = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 150,
    });
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            topAnchor,
        );
        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };
    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.scrollTop}>
                {children}
            </div>
        </Zoom>
    )
}

export default function Foreground(props: { backToTopAnchor: string }) {

    return (
        <Box>
            <Box style={{position: "fixed", width: "100%", background: "white", zIndex: 9999}}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant={"body1"} component={'div'}>dengzi's blog</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <NavTabs/>
                    </Grid>
                    <Grid item xs={3}/>
                </Grid>
                <Divider  variant={"fullWidth"}/>
            </Box>
            <BackToTop topAnchor={props.backToTopAnchor}>
                <Fab color="secondary" aria-label="up" size={"small"}>
                    <KeyboardArrowUpIcon/>
                </Fab>
            </BackToTop>
        </Box>
    )
}