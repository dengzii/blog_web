import React, {useEffect, useState} from "react";
import {
    AppBar,
    createStyles,
    Divider,
    Grid,
    Tab,
    Tabs,
    TabsActions,
    Theme,
    Typography,
    withStyles
} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Box from "@material-ui/core/Box";

const WhiteAppBar = withStyles({
    root: {
        background: "white",
        boxShadow: "none"
    }
})(AppBar);

interface StyledTabProps {
    label: string;
    selected: boolean;
}

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
    action?: React.Ref<TabsActions>;
    centered?: boolean;
    children?: React.ReactNode;
    indicatorColor?: 'secondary' | 'primary' | string;
    scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';
    textColor?: 'secondary' | 'primary' | 'inherit' | string;
    variant?: 'standard' | 'scrollable' | 'fullWidth';
}

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > div': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#635ee7',
        },
    },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{children: <div/>}}/>);

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: theme.typography.pxToRem(15),
            '&:focus': {
                opacity: 1,
            },
        },
    }),
)((props: StyledTabProps) => <Tab {...props} />);

const NavTabs = withRouter((props: RouteComponentProps) => {

    const tabs = ['Articles', 'Archive', 'About', 'Friends', 'Lab'];
    const oldPathname = window.location.pathname.toLowerCase();
    const getTabsIndexOfPathName = (pathname: string): number => {
        for (let i = 0; i < tabs.length; i++) {
            if (pathname.startsWith('/' + tabs[i].toLowerCase())) {
                return i;
            }
        }
        return 0;
    };
    const [tabIndex, setTabIndex] = React.useState(getTabsIndexOfPathName(oldPathname));

    props.history.listen((args: { pathname: string }) => {
        if (oldPathname === args.pathname.toLowerCase()) {
            return;
        }
        setTabIndex(getTabsIndexOfPathName(args.pathname.toLowerCase()));
    });
    const handleChange = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
        if (tabIndex === newTabIndex || tabIndex === -1) return;
        props.history.push("/" + tabs[newTabIndex].toLowerCase());
        setTabIndex(newTabIndex);
    };
    const a11yProps = (value: any) => {
        return {
            id: `nav-tab-${value}`,
            'aria-controls': `nav-tabpanel-${value}`,
        };
    };

    return (<WhiteAppBar position={"relative"} color={"default"}>
        <StyledTabs value={tabIndex} onChange={handleChange} aria-label={'navigation bar'} indicatorColor={"primary"}
                    scrollButtons="auto" textColor={"primary"}>
            {(tabs.map((item) =>
                (<StyledTab label={item} selected={true} {...a11yProps(item)} key={item}/>)
            ))}
        </StyledTabs>
    </WhiteAppBar>)
});

function FixedTopNavTabs(props: { scrollableNavTabsId: string }) {

    const [hidden, setHidden] = useState(true);
    let fixedBar: Element | null;

    const scrollEventListener = () => {
        if (fixedBar !== null) {
            const top = fixedBar.getBoundingClientRect().top;
            setHidden(top > 0)
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', scrollEventListener);
        fixedBar = window.document.querySelector(`#${props.scrollableNavTabsId}`);
        return () => {
            window.removeEventListener("scroll", scrollEventListener)
        }
    });
    return (
        <Box hidden={hidden}  position={"fixed"} style={{ width: "100%", background: "white", zIndex: 9999, left:"0", top:"0"}}>
            <Grid container>
                <Grid item xs={3}>
                    <Typography variant={"body1"} component={'div'}>dengzi's blog</Typography>
                </Grid>
                <Grid item xs={6}>
                    <NavTabs/>
                </Grid>
                <Grid item xs={3}/>
            </Grid>
            <Divider variant={"fullWidth"}/>
        </Box>
    )
}

function StickyNavTabs() {
    const id = "scrollable-nav-tabs";
    return (
        <>
            <FixedTopNavTabs scrollableNavTabsId={id}/>
            <div id={id}>
                <NavTabs/>
            </div>
        </>
    )
}

export default StickyNavTabs