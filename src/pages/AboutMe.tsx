import React, {useEffect, useState} from "react";
import {createStyles, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Markdown from "../highlight/Markdown";
import {getAbout} from "../api/Api";
import {isMobile} from "../utils/Utils";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(4),
        paddingLeft: isMobile() ? theme.spacing(2) : theme.spacing(6),
        paddingRight: isMobile() ? theme.spacing(2) : theme.spacing(6)
    }
}));

function AboutMe() {

    const style = useStyles();
    const [about, setAbout] = useState("");
    useEffect(() => {
        const subscription = getAbout()
            .subscribe(response => {
                setAbout(response.data.content)
            }, error => {

            });
        return () => {
            if (!subscription.closed) {
                subscription.unsubscribe()
            }
        }
    });

    return (
        <Paper className={style.root}>
            <Markdown markdown={about}/>
        </Paper>
    )
}


export default AboutMe