import React from "react";
import ArticleList from "../component/ArticleList";
import FriendsComponent from "../component/FriendsComponent";
import ArchiveComponent from "../component/ArchiveComponent";
import AboutMeComponent from "../component/AboutMeComponent";
import ArticleComponent from "../component/ArticleComponent";



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
        component: AboutMeComponent
    },
    {
        path: "/friends",
        exact: true,
        component: FriendsComponent
    },

    // {
    //     path: "/lab",
    //     exact: true,
    //     component: ArticleList
    // },
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