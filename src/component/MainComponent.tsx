import React, {useState} from 'react'
import {BrowserRouter} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import DrawerComponent from "./DrawerComponent";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import NavBarComponent from "./NavBarComponent";
import MainRouter from "../router/MainRouter";
import Hidden from "@material-ui/core/Hidden";

function isMobile(): boolean {
    let mobileAgent = false;///Android|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    let smallScreen = (window.innerWidth < 600);
    return mobileAgent || smallScreen;
}

export default function MainComponent() {

    let [drawerHidden, setDrawerHidden] = useState(isMobile());

    return (<div className="App">
        <BrowserRouter>
            <Hidden mdUp>
                <Drawer open={!drawerHidden && isMobile()} anchor={"left"}
                        onClose={() => setDrawerHidden(!drawerHidden)}>
                    <DrawerComponent/>
                </Drawer>
            </Hidden>
            <Grid container spacing={0}>
                <Grid item={true} md={2} hidden={drawerHidden}>
                    <Hidden xsDown>
                        <DrawerComponent/>
                    </Hidden>
                </Grid>
                <Grid item={true} xs md xl lg>
                    <Box height={"100vh"} width={"100%"} bgcolor="background.default">
                        <NavBarComponent onMenuClick={setDrawerHidden} drawerHidden={drawerHidden}/>
                        <Box style={{overflow: "auto"}}>
                            <MainRouter/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </BrowserRouter>
    </div>)
}