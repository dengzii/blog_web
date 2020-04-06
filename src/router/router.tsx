import ArticleList from "../component/ArticleList";
import FriendsComponent from "../component/FriendsComponent";
import ArchiveComponent from "../component/ArchiveComponent";
import AboutMeComponent from "../component/AboutMeComponent";

export const Router = {
    body: [
        {
            path: '/',
            exact:true,
            component: ArticleList
        },
        {
            path: '/home',
            component: ArticleList
        },
        {
            path: '/article',
            component: AboutMeComponent
        },
        {
            path: '/friends',
            component: FriendsComponent
        },
        {
            path: '/category/:c',
            component: ArticleList
        },
        {
            path: '/about',
            component: AboutMeComponent
        },
        {
            path: '/archive',
            component: ArchiveComponent
        }
    ]
};