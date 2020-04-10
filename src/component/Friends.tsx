import React from "react";
import {createStyles, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(4)
        }
    })
);

export default function Friends() {

    const styles = useStyles();
    return (
        <Paper className={styles.root}>
            Friends
        </Paper>
    )
}