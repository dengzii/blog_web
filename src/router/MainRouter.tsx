import React from "react";
import {Route, Switch} from "react-router-dom";
import ArticleList from "../component/ArticleList";
import FriendsComponent from "../component/FriendsComponent";
import ArticleComponent from "../component/ArticleComponent";
import AboutMeComponent from "../component/AboutMeComponent";
import ArchiveComponent from "../component/ArchiveComponent";

export default class MainRouter extends React.Component {

    render() {

        return (<div>
            <Switch>
                <Route exact path="/article/:id">
                    <ArticleComponent/>
                </Route>
                <Route exact path="/articles/:category">
                    <ArticleList/>
                </Route>
                <Route exact path="/">
                    <ArticleList/>
                </Route>
                <Route exact path="/articles">
                    <ArticleList/>
                </Route>
                <Route exact path="/archive">
                    <ArchiveComponent/>
                </Route>
                <Route exact path="/about">
                    <AboutMeComponent/>
                </Route>
                <Route exact path="/friends">
                    <FriendsComponent/>
                </Route>
                <Route path="*">
                    <h2>Not Found</h2>
                </Route>
            </Switch>
        </div>)
    }
}