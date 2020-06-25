import React from "react";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import LinkIcon from '@material-ui/icons/Link';

const elements = ["h1", "h2", "h3", "h4", "h5", "h6"];

const style = makeStyles((theme) => createStyles({
    link: {
        color: theme.palette.text.primary
    },
    heading:{
        display:"block",
        paddingBottom: theme.spacing(2),
        borderBottom: "1px solid #ececec"
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
                <a href={`#${nodeValue}`} className={`${classes.link} paragraph-anchor`} hidden><LinkIcon color={"primary"}/></a>
                <Heading level={level} id={nodeValue}>
                    <span className={level <= 2 ?classes.heading : ""}>{children}</span>
                </Heading>
            </>)
        } else {
            return <>{children}</>
        }
    };
    return <>{renderHtml()}</>;
}

export default React.memo(HeadingBlock)