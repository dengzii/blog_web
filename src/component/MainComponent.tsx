import React, {ReactElement} from 'react'
import {BrowserRouter, Switch} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {createStyles, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import StickyNavTabs from "./NavTabs";
import Footer from "./Footer";
import Foreground from "./Foreground";
import {MainRoute, Route} from "../router/router";
// function isMobile(): boolean {
//     let mobileAgent = false;///Android|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
//     let smallScreen = (window.innerWidth < 600);
//     return mobileAgent || smallScreen;
// }

let useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.grey["100"],
        },
        head: {
            paddingTop: theme.spacing(4),
            width: "100%",
            background: "white"
        },
        title: {
            cursor: "pointer",
            "&:hover": {
                color: theme.palette.primary.main
            }
        },
        body: {
            paddingTop: theme.spacing(2),
            minHeight: "100vh"
        },
        nav: {
            paddingTop: theme.spacing(2),
        }
    })
);

function createRouteElement(value: Route): ReactElement {
    return React.createElement(value.component, {exact: value.exact, path: value.path, key: value.path,})
}

export default function MainComponent() {
    const classes = useStyle();
    return (<div className="App">
        <div id={"back-to-top-anchor"}/>
        <BrowserRouter>
            <Foreground backToTopAnchor={"#back-to-top-anchor"}/>
            <Grid className={classes.root} container justify={"center"}>
                <Grid item className={classes.head} xs={12} container justify={"center"}>
                    <Grid item xs={12} md={10} lg={8} xl={6}>
                        <Box>
                            <Typography variant={"h4"} className={classes.title}>
                                dengzi's blog
                            </Typography>
                            <Typography variant={'subtitle1'} color={"textSecondary"}>
                                Try your best, and be best you!
                            </Typography>
                        </Box>
                        <Grid item xs={12} className={classes.nav}>
                            <StickyNavTabs/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item={true} className={classes.body} xs={12} md={10} lg={8} xl={6}>
                    <Switch>
                        {MainRoute.map((value) => createRouteElement(value))}
                    </Switch>
                </Grid>
                <Grid item={true} xs={12}>
                    <Footer/>
                </Grid>
            </Grid>
        </BrowserRouter>
    </div>)
}