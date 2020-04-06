import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";

const elements = ["h1", "h2", "h3", "h4", "h5", "h6"];

const style = makeStyles((theme) => createStyles({
    link: {
        color: theme.palette.text.primary
    }
}));

function Heading(props: { level: number, children: any[], id: string }) {
    return React.createElement(elements[props.level - 1] || elements[1], {id: props.id}, props.children);
}

function HeadingBlock(props: { level: number, children: any }) {

    const classes = style();
    const renderHtml = () => {
        const {level, children} = props;

        if (children && children.length > 0) {
            const nodeValue = children[0].props.value;
            return (
                <Heading level={level} id={nodeValue}>
                    <span className={"title"}>{children}</span>
                    <a href={"#" + nodeValue} className={classes.link}>#</a>
                </Heading>
            )
        } else {
            return <>{children}</>
        }
    };

    return <>{renderHtml()}</>;
}

export default React.memo(HeadingBlock)