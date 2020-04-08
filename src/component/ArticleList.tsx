import React from "react";
import {Box, Chip, createStyles, Fab, Grid, Paper, Theme} from "@material-ui/core";
import ArticleListItem from "./ArticleListItem";
import {makeStyles} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";

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

export interface Article {
    title: string,
    content: string,
    date: Date,
    view: number
}

const CategoryChip = withRouter((props: RouteComponentProps)=>{
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

export default function ArticleList(props: { type?: string }) {

    const style = classes();
    return (<>
        <Paper elevation={0}>
            <Box className={style.main}>
                <CategoryChip/>
                {getArticle().map((value) =>
                    (<ArticleListItem key={value.title} article={value}/>)
                )}

            </Box>
        </Paper>
        <Grid container={true} justify={"center"}>
            <Fab variant="extended" className={style.loadMore}>Load More</Fab>
        </Grid>
    </>);
}

function getArticle(): Article[] {

    return [
        {
            title: "嵌套关系.",
            content: "React Router 使用路由嵌套的概念来让你定义 view 的嵌套集合，当一个给定的 URL 被调用时，整个集合中（命中的部分）都会被渲染。嵌套路由被描述成一种树形结构。React Router 会深度优先遍历整个路由配置来寻找一个与给定的 URL 相匹配的路由。",
            date: new Date(),
            view: 122
        },
        {
            title: "路径语法.",
            content: "路由路径是匹配一个（或一部分）URL 的 一个字符串模式。大部分的路由路径都可以直接按照字面量理解，除了以下几个特殊的符号",
            date: new Date(),
            view: 122
        },
        {
            title: "路由切换时，组件生命周期的变化情况.",
            content: "在开发应用时，理解路由组件的生命周期是非常重要的。 后面我们会以获取数据这个最常见的场景为例，介绍一下路由改变时，路由组件生命周期的变化情况。\n" +
                "\n" +
                "路由组件的生命周期和 React 组件相比并没有什么不同。 所以让我们先忽略路由部分，只考虑在不同 URL 下，这些组件是如何被渲染的。",
            date: new Date(),
            view: 122
        },
        {
            title: "默认路由（IndexRoute）与 IndexLink.",
            content: "当用户访问 / 时, App 组件被渲染，但组件内的子元素却没有， App 内部的 this.props.children 为 undefined 。 你可以简单地使用 `{this.props.children ||\n" +
                "\n" +
                "}` 来渲染一些默认的 UI 组件。",
            date: new Date(),
            view: 122
        },
        {
            title: "在组件外部使用导航.",
            content: "虽然在组件内部可以使用 this.context.router 来实现导航，但许多应用想要在组件外部使用导航。使用Router组件上被赋予的history可以在组件外部实现导航",
            date: new Date(),
            view: 122
        },
        {title: "How to make more money1.", content: "I DK", date: new Date(), view: 122},
        {title: "How to make more money2.", content: "I DK", date: new Date(), view: 122},
        {title: "How to make more money3.", content: "I DK", date: new Date(), view: 122},
        {title: "How to make more money4.", content: "I DK", date: new Date(), view: 122},
        {title: "How to make more money5.", content: "I DK", date: new Date(), view: 122},
        {title: "How to make more money6.", content: "I DK", date: new Date(), view: 122},
        {title: "How to make more money7.", content: "I DK", date: new Date(), view: 122},
        {title: "How to make more money8.", content: "I DK", date: new Date(), view: 122},
    ]
}