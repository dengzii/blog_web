import React from 'react'
import {Box, Button, createStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Article} from "../api/model";
import  {timeStampSecToDateTime} from "../utils/TimeUtils";

let classes = makeStyles((theme) =>
    createStyles({
        main: {
            width: "100%"
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

    return (<Box className={style.main}>

        <CardContent>
            <Typography color="textPrimary" gutterBottom variant={"h6"}>
                <Link to={`/article/${article.id}`} className={style.title}>{article.title}</Link>
            </Typography>
            <Typography color={"textSecondary"}
                        variant={"subtitle2"}>{timeStampSecToDateTime(article.created_at)}</Typography>
            <Typography color="textSecondary" variant={"body1"}>{article.description}
                <Link to={"/article/1"} className={style.button}>
                    <Button size={"small"} color={"primary"}>Read More</Button>
                </Link>
            </Typography>
        </CardContent>
    </Box>)
}