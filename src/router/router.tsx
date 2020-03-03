import ArticleListComponent from "../component/ArticleListComponent";
import FriendsComponent from "../component/FriendsComponent";
import ArchiveComponent from "../component/ArchiveComponent";
import AboutMeComponent from "../component/AboutMeComponent";

export const Router = {
    main: [
        {
            path: '/',
            exact:true,
            component: ArticleListComponent
        },
        {
            path: '/home',
            component: ArticleListComponent
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
            component: ArticleListComponent
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