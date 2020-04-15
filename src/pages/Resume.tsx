import React from "react";
import Markdown from "../highlight/Markdown";
import {createStyles, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(4)
    }
}));

export default function Resume() {
    const style = useStyles();
    return (
        <Paper className={style.root}>
            <Markdown markdown={resume}/>
        </Paper>
    )
}
const resume = `
`;