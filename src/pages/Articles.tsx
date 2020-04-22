import React, {useEffect, useState} from "react";
import {Box, Button, Chip, createStyles, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getArticleList, getCategories} from "../api/Api";
import ArticleListItem from "../component/ArticleListItem";
import {Article, Category} from "../api/model";

let useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginBottom: theme.spacing(4)
        },
        article: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2)
        },
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


const emptyArticles: Article[] = [];
const emptyCategory: Category[] = [];

function CategoryChip(props: { selected: string, categories: Category[], onCategoryClick: (c: Category) => void }) {

    const style = useStyles();
    return (<>
            {props.categories.map((value) =>
                <Chip key={value.name} className={style.chip} label={value.name}
                      onClick={(event => {
                          props.onCategoryClick(value);
                      })}
                      color={(value.name === props.selected) ? "primary" : "default"}/>
            )
            }
        </>
    )
}

function ArticleWrap(props: RouteComponentProps) {

    const [categories, setCategories] = useState(emptyCategory);
    const [category, setCategory] = useState("");

    useEffect(() => {
        const categorySubscription = getCategories()
            .subscribe(response => {
                setCategories(response.data)
            }, error => {

            });
        return () => {
            if (!categorySubscription.closed) {
                categorySubscription.unsubscribe()
            }
        }
    }, []);

    const handleCategoryClick = (c: Category) => {
        props.history.push(`/category/${c.name.toLowerCase()}`);
        setCategory(c.name);
    };

    const styles = useStyles();
    return (
        <>
            <Paper elevation={1} className={styles.paper}>
                <Box className={styles.main}>
                    <CategoryChip selected={category} categories={categories} onCategoryClick={handleCategoryClick}/>
                    <ArticlesList category={category}/>
                </Box>
            </Paper>
        </>
    )
}

function ArticlesList(props: {category: string}) {

    const [last, setLast] = useState((new Date()).valueOf());
    const [articles, setArticles] = useState(emptyArticles);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const subscription = getArticleList(last, props.category)
            .subscribe(response => {
                const data = response.data;
                const lastArticle = data[data.length - 1];
                if (lastArticle === undefined || lastArticle.updated_at === last) {
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
    }, [last]);

    const handleLoadMore = () => {
        if (articles.length > 0) {
            setLast(articles[articles.length - 1].updated_at)
        }
    };

    const style = useStyles();
    return (<>
        {articles.map((value: Article) =>
            (<ArticleListItem key={value.updated_at} article={value}/>)
        )}
        <Grid container={true} justify={"center"}>
            <Button className={style.loadMore} variant={"text"}
                    onClick={handleLoadMore}>{hasMore ? "查看更多" : "没有更多了"}</Button>
        </Grid>
    </>);
}

export default withRouter(ArticleWrap)