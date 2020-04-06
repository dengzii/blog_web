import React from "react";
import {AppBar, Tab, Tabs, withStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";

const WhiteAppBar = withStyles({
    root: {
        background: "white",
        boxShadow: "none"
    }
})(AppBar);

function NavComponent(props: RouteComponentProps) {

    const [value, setValue] = React.useState(0);
    const tabs = ['Articles', 'Archive', 'About', 'Friends', 'Lab'];
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        props.history.push("/" + tabs[newValue].toLowerCase());
        setValue(newValue);
    };

    const a11yProps = (value: any) => {
        return {
            id: `nav-tab-${value}`,
            'aria-controls': `nav-tabpanel-${value}`,
        };
    };

    return (<WhiteAppBar position={"relative"} color={"default"}>
        <Tabs value={value} onChange={handleChange} aria-label={'navigation bar'} indicatorColor={"primary"}
              scrollButtons="auto" textColor={"primary"}>
            {(tabs.map((item) =>
                (<Tab label={item} {...a11yProps(item)} key={item}/>)
            ))}
        </Tabs>
    </WhiteAppBar>)
}

export default withRouter(NavComponent)