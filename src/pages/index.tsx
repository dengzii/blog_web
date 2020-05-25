import React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {createStyles, Grid, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import StickyNavTabs from "../component/NavTabs";
import Footer from "../component/Footer";
import Foreground from "../component/Foreground";
import Articles from "./Articles";
import Archives from "./Archive";
import AboutMe from "./AboutMe";
import Friends from "./Friends";
import Lab from "../component/Lab";
import NotFound from "./404";
import ArticleTab from "./ArticleTab";

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

export default function Index() {
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
                        <Route path={"/"} exact={true} children={<Articles/>}/>
                        <Route path={"/articles"} exact={true} children={<Articles/>}/>
                        <Route path={"/category/:type"} exact={true} children={<Articles/>}/>
                        <Route path={"/article/:id"} exact={true} children={<ArticleTab/>}/>
                        <Route path={"/archive"} exact={true} children={<Archives/>}/>
                        <Route path={"/about"} exact={true} children={<AboutMe/>}/>
                        <Route path={"/friends"} exact={true} children={<Friends/>}/>
                        <Route path={"/lab"} exact={true} children={<Lab/>}/>
                        <Route path={"*"} exact={false} children={<NotFound/>}/>
                    </Switch>
                </Grid>
                <Grid item={true} xs={12}>
                    <Footer/>
                </Grid>
            </Grid>
        </BrowserRouter>
    </div>)
}