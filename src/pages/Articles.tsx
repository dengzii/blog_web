import React, {useEffect, useState} from "react";
import {Box, Chip, createStyles, Fab, Grid, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getHomeArticleList} from "../api/Api";
import ArticleListItem from "../component/ArticleListItem";
import {Article} from "../api/model";

let classes = makeStyles((theme: Theme) =>
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
    const style = classes();
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

export default function Articles(props: { type?: string }) {

    const style = classes();
    const init: Article[] = [];
    const [articles, setArticles] = useState(init);

    useEffect(()=>{
        let a= getHomeArticleList()
            .subscribe(response => {
                console.log(response.data)
                // setArticles(response.data)
            }, error => {

            });
        return ()=>{a.unsubscribe()}
    });

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
            <Fab variant="extended" className={style.loadMore}>Load More</Fab>
        </Grid>
    </>);
}