import React from "react";
import Articles from "../pages/Articles";
import Friends from "../pages/Friends";
import Archive from "../pages/Archive";
import AboutMe from "../pages/AboutMe";
import ArticleComponent from "../component/ArticleComponent";
import Lab from "../component/Lab";
import NotFound from "../pages/404";


export interface Route {
    readonly path: string,
    readonly exact: boolean,
    readonly component: React.ElementType
}

export const MainRoute: Route[] = [
    {
        path: "/",
        exact: true,
        component: Articles
    },
    {
        path: "/articles",
        exact: true,
        component: Articles
    },
    {
        path: "/category/:type",
        exact: true,
        component: Articles
    },
    {
        path: "/article/:id",
        exact: true,
        component: ArticleComponent
    },
    {
        path: "/archive",
        exact: true,
        component: Archive
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
    {
        path: "*",
        exact: false,
        component: NotFound
    },
];