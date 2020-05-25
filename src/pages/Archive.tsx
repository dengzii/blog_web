import React, {useEffect, useState} from "react";
import {createStyles, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {Archive} from "../api/model";
import {getYearFromTimeStampSec, timeStampSecToDateTime} from "../utils/TimeUtils";
import {getArchives} from "../api/Api";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(4),
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
        },
        time: {
            paddingTop: theme.spacing(1),
            fontWeight: "bold"
        },
        articleItem: {
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(1),
        },
        link: {
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline"
            }
        }
    })
);

const emptyArchive: { time: number, archive: Archive[] }[] = [];

function Archives() {

    const styles = useStyles();
    const [archive, setArchive] = useState(emptyArchive);
    useEffect(() => {
        const subscription = getArchives()
            .subscribe(response => {
                    const all: { time: number, archive: Archive[] }[] = [];
                    let p: Archive[] = [];
                    let y = 2020;
                    let data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        let archive = data[i];
                        let y1 = getYearFromTimeStampSec(archive.created_at);
                        if (y1 !== y || i === data.length - 1) {
                            y = y1;
                            all.push({time: y, archive: p});
                            p = [];
                        }
                        p.push(archive)
                    }
                    console.log(all);
                    setArchive(all)
                }
                , error => {

                });
        return () => {
            if (!subscription.closed) {
                subscription.unsubscribe()
            }
        }
    }, []);
    return (<Paper className={styles.root}>
        <Typography variant={"h5"}>Archive</Typography>
        <br/>
        {archive.map((value) => (
            <>
                <Typography className={styles.time} variant={"subtitle1"} component={"p"}>{value.time}</Typography>
                {value.archive.map((article) => (
                    <Typography key={article.created_at} className={styles.articleItem} variant={"body1"}
                                component={"p"}>{timeStampSecToDateTime(article.created_at)} <Link
                        to={"/article/" + article.id} className={styles.link}>{article.title}</Link></Typography>
                ))}
            </>
        ))}

    </Paper>)
}

export default Archives