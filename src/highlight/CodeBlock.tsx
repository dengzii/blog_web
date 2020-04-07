import React, {useEffect} from "react";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
// @ts-ignore
import {java, javascript, jsx, kotlin, python, typescript} from 'react-syntax-highlighter/dist/esm/languages/prism';
import {darcula} from "react-syntax-highlighter/dist/esm/styles/prism";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Paper, Typography} from "@material-ui/core";

const style = makeStyles((theme: Theme) =>
    createStyles({
        codeRoot: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        title: {
            paddingLeft: theme.spacing(1),
            paddingBottom: -theme.spacing(1)
        },
        code: {
            paddingTop: "0px"
        }
    })
);

export default function CodeBlock(props: { language: string, value: string }) {
    const styles = style();
    useEffect(() => {
        SyntaxHighlighter.registerLanguage("jsx", jsx);
        SyntaxHighlighter.registerLanguage("javascript", javascript);
        SyntaxHighlighter.registerLanguage("typescript", typescript);
        SyntaxHighlighter.registerLanguage("java", java);
        SyntaxHighlighter.registerLanguage("kotlin", kotlin);
        SyntaxHighlighter.registerLanguage("python", python);
    });
    return (
        <Paper className={styles.codeRoot} elevation={8}>
            <Typography variant={"caption"} className={styles.title}
                        component={'b'}>Language: {props.language === null ? "plain text": props.language}</Typography>
            <SyntaxHighlighter language={props.language} style={darcula} showLineNumbers={true}
                               startingLineNumber={0}>
                {props.value}
            </SyntaxHighlighter>
        </Paper>
    )
}