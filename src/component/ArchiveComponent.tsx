import React from "react";
import {createStyles, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(4),
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
            minHeight: "50vh"
        },
        time: {
            paddingTop: theme.spacing(1),
            fontWeight: "bold"
        },
        articleItem: {
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(1),
        },
        link:{
            textDecoration: "none",
            "&:hover":{
                textDecoration: "underline"
            }
        }
    })
);

function ArchiveComponent() {

    const styles = useStyles();
    return (<Paper className={styles.root}>
        <Typography variant={"h5"}>Archive</Typography>
        <br/>
        {getArchive().map((value) => (
            <>
                <Typography className={styles.time} variant={"subtitle1"} component={"p"}>{value.time}</Typography>
                {value.articles.map((value) => (
                    <Typography className={styles.articleItem} variant={"body1"} component={"p"}>{value.time} <Link
                        to={"/article/" + value.id} className={styles.link}>{value.title}</Link></Typography>
                ))}
            </>
        ))}

    </Paper>)
}

export default ArchiveComponent

interface Archive {
    time: string;
    articles: {
        time: number;
        title: string;
        id: string;
    }[]
}

function getArchive(): Archive[] {
    return [
        {
            time: "2020-01",
            articles: [
                {time: 100000, title: "如何学习 React", id: "1"},
                {time: 100000, title: "Material Ui 的教程", id: "1"},
                {time: 100000, title: "JVM 深入理解原理", id: "1"}]
        },
        {
            time: "2020-01",
            articles: [
                {time: 100000, title: "如何学习 React", id: "1"},
                {time: 100000, title: "Material Ui 的教程", id: "1"},
                {time: 100000, title: "JVM 深入理解原理", id: "1"}]
        },
        {
            time: "2020-01",
            articles: [
                {time: 100000, title: "如何学习 React", id: "1"},
                {time: 100000, title: "Material Ui 的教程", id: "1"},
                {time: 100000, title: "JVM 深入理解原理", id: "1"}]
        },
        {
            time: "2020-01",
            articles: [
                {time: 100000, title: "如何学习 React", id: "1"},
                {time: 100000, title: "Material Ui 的教程", id: "1"},
                {time: 100000, title: "JVM 深入理解原理", id: "1"}]
        },
        {
            time: "2020-01",
            articles: [
                {time: 100000, title: "如何学习 React", id: "1"},
                {time: 100000, title: "Material Ui 的教程", id: "1"},
                {time: 100000, title: "JVM 深入理解原理", id: "1"}]
        },
    ];
}