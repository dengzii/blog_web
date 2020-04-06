import React from 'react'
import {BrowserRouter} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {createStyles, Grid, Theme, Typography} from "@material-ui/core";
import MainRouter from "../router/MainRouter";
import {makeStyles} from "@material-ui/core/styles";
import NavComponent from "./NavComponent";
import Footer from "./Footer";
import Foreground from "./Foreground";
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
        title: {},
        body: {
            paddingTop: theme.spacing(2),
            minHeight: "100vh"
        },
        nav: {
            paddingTop: theme.spacing(2),
        }
    })
);

// const StyledBreadcrumb = withStyles((theme: Theme) => ({
//     root: {
//         backgroundColor: theme.palette.grey[100],
//         height: theme.spacing(3),
//         color: theme.palette.grey[800],
//         fontWeight: theme.typography.fontWeightRegular,
//         '&:hover, &:focus': {
//             backgroundColor: theme.palette.grey[300],
//         },
//         '&:active': {
//             boxShadow: theme.shadows[1],
//             backgroundColor: emphasize(theme.palette.grey[300], 0.12),
//         },
//     },
// }))(Chip) as typeof Chip;

export default function MainComponent() {

    const classes = useStyle();

    return (<div className="App">
        <BrowserRouter>
            <Foreground/>
            <Grid className={classes.root} container justify={"center"}>
                <Grid item className={classes.head} xs={12} container justify={"center"}>
                    <Grid item xs={12} md={10} lg={6}>
                        <Box className={classes.title}>
                            <Typography variant={"h4"}>
                                dengzi's blog
                            </Typography>
                            <Typography variant={'subtitle1'} color={"textSecondary"}>
                                Try your best, and be best you!
                            </Typography>
                        </Box>
                        <Grid item xs={12} className={classes.nav}>
                            <NavComponent/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item={true} className={classes.body} md={10} lg={6}>
                    <MainRouter/>
                </Grid>
                <Grid item={true} xs={12}>
                    <Footer/>
                </Grid>
            </Grid>
        </BrowserRouter>
    </div>)
}