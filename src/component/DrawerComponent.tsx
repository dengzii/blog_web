import React from "react";
import {Box} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DrawerNavItem, {NavItemProps} from "./DrawerNavItem";
import LoginDialog from "./LoginDialog";

const style = {
    height: "100vh",
    overflow: "auto",
    borderRight: "1px #ccc solid"
};

const categories: NavItemProps[] = [
    "Java",
    "Python",
    "TypeScript",
    "Android"
].map((value) => createNav(value, "/category/" + value.toLowerCase()));

function createNav(title: string, path: string = "#", child: undefined | NavItemProps[] = undefined): NavItemProps {
    return {
        title: title, path: path, currentPath: "/", child: child, isButton: path === "#" || child !== undefined, onSelect: undefined
    }
}

function DrawerHeaderComponent() {
    return (
        <Grid container justify="center" alignItems="center" style={{height: "200px"}}>
            <Grid container justify="center" alignItems="flex-start">
                <Avatar alt="dengzi" style={{height: "80px", width: "80px"}}
                        src={"http://dengzii.com/static/img/pic.png"}/>
            </Grid>
            <Typography variant="h6">dengzi</Typography>
        </Grid>
    )
}

export default function DrawerComponent() {

    let [currentPath, setCurrentPath] = React.useState(window.location.pathname);
    let [loginDialogOpen, setLoginDialogOpen] = React.useState(false);

    const nav: NavItemProps[] = [
        createNav("New", "/new"),
        createNav("Home", "/home"),
        createNav("Category", "/category", categories),
        createNav("Friends", "/friends"),
        createNav("About", "/about"),
        createNav(""),
        createNav("Settings")
    ];

    let onItemSelected = (path: string) => {
        if (path === "#") {
            return;
        }
        setCurrentPath(path)
    };

    let loginItem = createNav("Login");

    loginItem.onSelect = (path: string) => {
        setLoginDialogOpen(!loginDialogOpen);
    };
    nav.push(loginItem);

    React.useEffect(() => {

    });

    let divider = (<Divider key={new Date().toTimeString()}/>);
    let items = nav.map((value: NavItemProps) => {
            if (value.onSelect === undefined) {
                value.onSelect = onItemSelected;
            }
            value.currentPath = currentPath;
            return (value.title === "" ? divider : <DrawerNavItem {...value} key={value.title}/>);
        }
    );

    return (<div>
        <Box bgcolor="background.paper" style={style}>
            <DrawerHeaderComponent/>
            <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}/>
            <Divider/>
            <List>{items}</List>
        </Box>
    </div>)
}