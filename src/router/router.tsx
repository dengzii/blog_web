import React from "react";
import ArticleList from "../component/ArticleList";
import Friends from "../component/Friends";
import ArchiveComponent from "../component/ArchiveComponent";
import AboutMe from "../component/AboutMe";
import ArticleComponent from "../component/ArticleComponent";
import Lab from "../component/Lab";



export interface Route {
    readonly path: string,
    readonly exact: boolean,
    readonly component: React.ElementType
}

export const MainRoute: Route[] = [
    {
        path: "/",
        exact: true,
        component: ArticleList
    },
    {
        path: "/articles",
        exact: true,
        component: ArticleList
    },
    {
        path: "/category/:type",
        exact: true,
        component: ArticleList
    },
    {
        path: "/article/:id",
        exact: true,
        component: ArticleComponent
    },
    {
        path: "/archive",
        exact: true,
        component: ArchiveComponent
    },
    {
        path: "/about",
        exact: true,
        component: AboutMe
    },
    {
        path: "/friends",
        exact: true,
        component: Friends
    },

    {
        path: "/lab",
        exact: true,
        component: Lab
    },
    // {
    //     path: "/project",
    //     exact: true,
    //     component: ArticleList
    // },
    // {
    //     path: "*",
    //     exact: false,
    //     component: (<h2>Not Found</h2>)
    // },
];