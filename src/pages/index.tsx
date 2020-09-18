import React, {useEffect, useState} from 'react'
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
import {getCookie, setCookie} from "../utils/Cookies";
import {getProfile, viewSite} from "../api/Api";
import {Profile} from "../api/model";
import Fade from "@material-ui/core/Fade";
import {isMobile} from "../utils/Utils";
import Md2Pdf from "./Md2Pdf";

let useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.grey["100"],
        },
        head: {
            paddingLeft: isMobile() ? theme.spacing(2) : theme.spacing(1),
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
const emptyProfile: Profile = {
    avatar: "-",
    bio: "-",
    email: "-",
    follower: 0,
    following: 0,
    github: "-",
    likes: 0,
    links: "-",
    name: "-",
    site_name: "-",
    views: 0,
};


export default function Index() {
    return (
        <Fade in={true} timeout={1000}>
            <BrowserRouter>
                <Switch>
                    <Route path={"/md2pdf"} exact={true} children={<Md2Pdf/>}/>
                    <Route path={"*"} exact={false} children={<Main/>}/>
                </Switch>
            </BrowserRouter>
        </Fade>)
}

function Main(props: any) {
    const classes = useStyle();
    const [profile, setProfile] = useState(emptyProfile);

    useEffect(() => {
        let firstTime = getCookie("first_load");
        if (firstTime === null) {
            viewSite().subscribe(() => {
                setCookie("first_load", "1", 1)
            });
        }
        getProfile().subscribe((response) => {
            setProfile(response.data);
        })
    }, []);

    window.document.title = profile.site_name;

    return (<div className="App" {...props}>
        <div id={"back-to-top-anchor"}/>
        <BrowserRouter>
            <Foreground backToTopAnchor={"#back-to-top-anchor"}/>
            <Grid className={classes.root} container justify={"center"}>
                <Grid item className={classes.head} xs={12} container justify={"center"}>
                    <Grid item xs={12} md={10} lg={8} xl={6}>
                        <Box>
                            <Typography variant={"h4"} className={classes.title}>
                                {profile.site_name + " "}
                            </Typography>
                            <Typography variant={'subtitle1'} color={"textSecondary"}>
                                {profile.bio + " "}
                            </Typography>
                        </Box>
                        <Grid item xs={12} className={classes.nav}>
                            <StickyNavTabs avatar={profile.avatar}/>
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
                    <Footer profile={profile}/>
                </Grid>
            </Grid>
        </BrowserRouter>
    </div>)
}