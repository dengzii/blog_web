import React, {useEffect, useState} from "react";
import {Box, Chip, createStyles, Fab, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {RouteComponentProps, useParams, withRouter} from "react-router-dom";
import {getHomeArticleList} from "../api/Api";
import ArticleListItem from "../component/ArticleListItem";
import {Article} from "../api/model";

let useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            paddingTop: theme.spacing(3),
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        },
        chip: {
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        loadMore: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4)
        }
    })
);

const CategoryChip = withRouter((props: RouteComponentProps) => {
    const category = ['Android', 'Python', 'Vue', 'React', 'TypeScript', 'Go'];
    const style = useStyles();
    let [currentPath, setCurrentPath] = React.useState(window.location.pathname.toLowerCase());
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        let cat = (e.currentTarget.textContent as string).toLowerCase();
        setCurrentPath(cat);
        props.history.push("/category/" + cat);
    };
    return (<Box>
        {(category.map((value) =>
            <Chip key={value} className={style.chip} label={value} onClick={handleClick}
                  color={(currentPath.endsWith(value.toLowerCase())) ? "primary" : "default"}/>
        ))}
    </Box>)
});

const init: Article[] = [];

export default function Articles() {

    const params: { type?: string | undefined } = useParams();
    const style = useStyles();
    const [page, setPage] = useState((new Date()).valueOf());
    const [articles, setArticles] = useState(init);
    const [hasMore, setHasMore] = useState(true);

    console.log(params.type);
    useEffect(() => {
        const subscription = getHomeArticleList(page)
            .subscribe(response => {
                const data = response.data;
                const lastArticle = data[data.length - 1];
                if (lastArticle === undefined || lastArticle.updated_at === page) {
                    setHasMore(false)
                } else {
                    setArticles(articles.concat(data));
                }
            }, error => {

            });
        return () => {
            if (!subscription.closed) {
                subscription.unsubscribe()
            }
        }
    }, [page]);

    const handleLoadMore = () => {
        if (articles.length > 0) {
            setPage(articles[articles.length - 1].updated_at)
        }
    };

    return (<>
        <Paper elevation={1}>
            <Box className={style.main}>
                <CategoryChip/>
                {articles.map((value: Article) =>
                    (<ArticleListItem key={value.title} article={value}/>)
                )}
            </Box>
        </Paper>
        <Grid container={true} justify={"center"}>
            <Fab variant="extended" className={style.loadMore}
                 onClick={handleLoadMore}>{hasMore ? "查看更多" : "没有更多了"}</Fab>
        </Grid>
    </>);
}