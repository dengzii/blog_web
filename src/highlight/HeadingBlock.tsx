import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import LinkIcon from '@material-ui/icons/Link';

const elements = ["h1", "h2", "h3", "h4", "h5", "h6"];

const style = makeStyles((theme) => createStyles({
    link: {
        color: theme.palette.text.primary
    }
}));

function Heading(props: { level: number, children: any, id: string | null }) {
    return React.createElement(elements[props.level - 1] || elements[1], {id: props.id}, props.children);
}

function HeadingBlock(props: { level: number, children: any }) {

    const classes = style();
    const renderHtml = () => {
        const {level, children} = props;

        if (children && children.length > 0) {
            let nodeValue: string = children[0].props.value;
            if (nodeValue !== undefined) {
                nodeValue = nodeValue.replace(/[.\s'",~!@#$%^&*()_+=\-/\\]/g, "-");
            }
            return (<>
                <Heading level={level} id={nodeValue}>
                    <span>{children}</span>
                    <a href={"#" + nodeValue} className={classes.link} hidden><LinkIcon color={"action"}/></a>
                </Heading>
            </>)
        } else {
            return <>{children}</>
        }
    };
    return <>{renderHtml()}</>;
}

export default React.memo(HeadingBlock)