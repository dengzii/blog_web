import React, {useEffect, useState} from "react";
import {AppBar, createStyles, Divider, Grid, Tab, Tabs, TabsActions, Theme, withStyles} from "@material-ui/core";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const WhiteAppBar = withStyles({
    root: {
        background: "white",
        boxShadow: "none"
    }
})(AppBar);

const useStyle = makeStyles((theme: Theme) => createStyles({
    fixedBar: {
        position: "fixed",
        width: "100%",
        background: "white",
        zIndex: 9999,
        left: "0px",
        top: "0px"
    },
    avatarBox: {
        height: "40px",
        position: "relative",
        top: "50%",
        marginTop: "-20px",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    avatar: {
        height: "40px",
        width: "40px",
    }
}));

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
    let change = false;
    const [tabIndex, setTabIndex] = React.useState(getTabsIndexOfPathName(oldPathname));

    props.history.listen((args: { pathname: string }) => {
        if (oldPathname === args.pathname.toLowerCase()) {
            return;
        }
        change = true;
        setTabIndex(getTabsIndexOfPathName(args.pathname.toLowerCase()));
    });
    const handleChange = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
        if (change) return;
        props.history.push("/" + tabs[newTabIndex].toLowerCase());
        change = false;
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
    const styles = useStyle();
    return (
        <Box hidden={hidden} className={styles.fixedBar}>
            <Grid container justify={"center"} alignItems={"center"}>
                {/*<Box className={styles.avatarBox}>*/}
                {/*    <Avatar className={styles.avatar} src={"/pic.jpg"} alt={'avatar'}/>*/}
                {/*</Box>*/}
                <Grid item xs={12} md={10} lg={8} xl={6}>
                    <NavTabs/>
                </Grid>
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