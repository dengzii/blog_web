import React from "react";
import {createStyles, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(4),
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
            minHeight: "50vh"
        }
    })
);

export default function Lab() {
    const styles = useStyles();

    return (
        <Paper className={styles.root}>
            <Typography variant={"h5"}>Lab</Typography>
        </Paper>
    )
}
