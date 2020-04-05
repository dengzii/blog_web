import React from 'react'
import {BrowserRouter} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import MainRouter from "../router/MainRouter";
import {makeStyles} from "@material-ui/core/styles";
import NavComponent from "./NavComponent";

function isMobile(): boolean {
    let mobileAgent = false;///Android|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    let smallScreen = (window.innerWidth < 600);
    return mobileAgent || smallScreen;
}

let useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: '#eee',
        },
        head: {
            paddingTop: theme.spacing(4),
            width: "100%",
            background: "white"
        },
        title: {},
        body: {
            paddingTop: theme.spacing(2)
        },
        nav: {
            paddingTop: theme.spacing(2),
        }
    })
);

export default function MainComponent() {

    const classes = useStyle();

    return (<div className="App">
        <BrowserRouter>
            <Box>
                <Grid container justify={"center"}>

                </Grid>
            </Box>
            <Grid className={classes.root} container justify={"center"}>
                <Grid item className={classes.head} xs={12} container justify={"center"}>
                    <Grid item xs={12} md={10} lg={6}>
                        <Box className={classes.title}>
                            <Typography variant={"h4"}>
                                dengzi blog
                            </Typography>
                            <Typography variant={'subtitle2'} color={"textSecondary"}>
                                try your best, and be best you!
                            </Typography>
                        </Box>
                        <Grid item xs={12} className={classes.nav}>
                            <NavComponent/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.body} md={10} lg={6}>
                    <Paper elevation={0}>
                        <MainRouter/>
                    </Paper>
                </Grid>
            </Grid>
        </BrowserRouter>
    </div>)
}