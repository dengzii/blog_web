import React from "react";
import {Route, Switch} from "react-router-dom";
import ArticleListComponent from "../component/ArticleListComponent";
import FriendsComponent from "../component/FriendsComponent";
import ArticleComponent from "../component/ArticleComponent";
import AboutMeComponent from "../component/AboutMeComponent";

export default class MainRouter extends React.Component {

    render() {

        return (<div>
            <Switch>
                <Route exact path="/article/:id">
                    <ArticleComponent/>
                </Route>
                <Route exact path="/category/:type">
                    <ArticleListComponent/>
                </Route>
                <Route exact path="/home">
                    <ArticleListComponent/>
                </Route>
                <Route exact path="/about">
                    <AboutMeComponent/>
                </Route>
                <Route exact path="/friends">
                    <FriendsComponent/>
                </Route>
                <Route exact path="/">
                    <ArticleListComponent/>
                </Route>
                <Route path="*">
                    <h2>Not Found</h2>
                </Route>
            </Switch>
        </div>)
    }
}