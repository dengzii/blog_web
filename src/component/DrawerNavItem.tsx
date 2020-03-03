import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {Box} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

const style = {
    link: {
        display: "block",
        color: "black",
        width: "100%",
        textDecoration: "none",
        padding: "8px 16px" // spacing 2, 3
    },
    child: {
        display: "block",
        color: "black",
        width: "100%",
        textDecoration: "none",
        padding: "8px 32px"
    }
};

export type OnSelectListener = (path: string) => void;

export type NavItemProps = {
    title: string;
    path: string;
    currentPath: string;
    onSelect?: OnSelectListener;
    child?: NavItemProps[];
    parent?: NavItemProps;
    isButton?: boolean
}

export default class DrawerNavItem extends React.Component<NavItemProps, { expand: boolean }> {

    constructor(props: Readonly<NavItemProps>) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.state = {expand: false};
    }

    componentDidMount(): void {
        if (this.props.currentPath.startsWith(this.props.path)) {
            this.setState({expand: true});
        }
    }

    handleItemClick(e: React.MouseEvent): void {
        e.preventDefault();
        if (this.props.onSelect !== undefined) {
            this.props.onSelect(this.props.path);
        }
        if (this.hasChild()) {
            this.setState({expand: !this.state.expand});
        }
    }

    render() {
        let item: JSX.Element;
        let child: JSX.Element | null = null;
        let iconRight: JSX.Element | null = null;
        let iconLeft: JSX.Element | null = null;

        // iconLeft = (<ListItemIcon><ExpandMore/></ListItemIcon>);

        if (this.hasChild()) {
            iconRight = this.state.expand ? <ExpandLess/> : <ExpandMore/>
        }
        item = (
            <ListItem button key={this.props.title} selected={this.isSelected()}
                      style={{padding: "0px"}}
                      onClick={this.handleItemClick}>
                {iconLeft}
                <Link to={this.hasChild() ? "#" : this.props.path}
                      style={this.props.parent !== undefined ? style.child : style.link}>
                    <ListItemText primary={this.props.title}/>
                </Link>
                {iconRight}
            </ListItem>
        );

        if (this.hasChild(this.props.child)) {
            child = (
                <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {(this.props.child.map((item) => (
                            <DrawerNavItem currentPath={this.props.currentPath} onSelect={this.props.onSelect}
                                           title={item.title} path={item.path} parent={item} key={item.title}/>
                        )))}
                    </List>
                </Collapse>
            );
        }

        return (<Box>{item}{child}</Box>)
    }

    private isSelected(): boolean {
        let isButton = this.props.isButton;
        let isCurrentPath = this.props.currentPath === this.props.path;
        return !isButton && isCurrentPath
    }

    private hasChild(c: NavItemProps[] | undefined = this.props.child): c is NavItemProps[] {
        return typeof c !== "undefined" && c.length > 0;
    }
}
