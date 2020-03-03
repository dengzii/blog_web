import React, {useEffect, useState} from "react";
import {Box, Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export interface Article {
    title: string,
    content: string,
    date: Date,
    view: number
}

class ArticleListComponent extends React.Component<{ type?: string }, any> {

    private _article: Article[];

    constructor(props: Readonly<any>) {
        super(props);

        this._article = [
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

    render() {
        return (<Box style={StyleMainContainer}>
            {this._article.map((value) => (
                <ArticleListItem key={value.title} article={value}/>
            ))}
        </Box>);
    }
}

class ArticleListItem extends React.Component<{ article: Article }, any> {

    private _article: Article;

    constructor(props: { article: Article }, context: any) {
        super(props, context);
        this._article = props.article;
    }

    render() {
        return (<Box paddingBottom={"16px"}>
            <Card>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom variant={"h5"}
                                component={"h2"}>{this._article.title}</Typography>
                    <Typography color={"textSecondary"}
                                component={"p"}
                                variant={"subtitle2"}>{this._article.date.toLocaleTimeString()}</Typography>
                    <Typography color="textSecondary" variant={"body1"}
                                component={"p"}>{this._article.content}</Typography>
                </CardContent>
                <CardActions>
                    <Link to={"/article/1"} style={{textDecoration: "none"}}>
                        <Button size={"small"} color={"primary"}>Read More</Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>);
    }
}

const StyleMainContainer = {
    paddingLeft: '40px',
    paddingTop: '50px',
    paddingRight: '40px',
    height: '85vh',
};

export default ArticleListComponent