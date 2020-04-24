import React, {useEffect, useState} from "react";
import {createStyles, Paper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {Archive} from "../api/model";
import {timeStampSecToDateTime} from "../utils/TimeUtils";
import {getArchives} from "../api/Api";

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
        link: {
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline"
            }
        }
    })
);

const emptyArchive: Archive[] = [];

function Archives() {

    const styles = useStyles();
    const [archive, setArchive] = useState(emptyArchive);
    useEffect(() => {
        const subscription = getArchives()
            .subscribe(response => {
                    setArchive(response.data)
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
                {value.articles.map((article) => (
                    <Typography key={article.updated_at} className={styles.articleItem} variant={"body1"}
                                component={"p"}>{timeStampSecToDateTime(article.updated_at)} <Link
                        to={"/article/" + article.cid} className={styles.link}>{article.title}</Link></Typography>
                ))}
            </>
        ))}

    </Paper>)
}

export default Archives