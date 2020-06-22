import React from 'react'
import {Box, Button, createStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Article} from "../api/model";
import {timeStampSecToDate} from "../utils/TimeUtils";

let classes = makeStyles((theme) =>
    createStyles({
        main: {
            width: "100%",
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        title: {
            color: theme.palette.text.primary,
            textDecoration: "none"
        },
        button: {
            textDecoration: "none"
        }
    })
);

export default function ArticleListItem(props: { article: Article }) {

    const article = props.article;
    const style = classes();

    return (
            <Box className={style.main}>
                <Link to={`/article/${article.id}`} className={style.title}>
                    <Typography color="textPrimary" gutterBottom variant={"h6"}>
                        {article.title}
                    </Typography>
                </Link>
                <Typography color={"textSecondary"} variant={"overline"}>
                    {article.category_name} / {timeStampSecToDate(article.created_at)}
                </Typography>
                <Typography color="textSecondary" variant={"body1"}>{article.description}
                    <Link to={`/article/${article.id}`} className={style.button}>
                        <Button size={"small"} color={"primary"}>Read More</Button>
                    </Link>
                </Typography>
            </Box>)
}