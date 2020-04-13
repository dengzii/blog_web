import React from "react";
import {get} from "./rxios";
import {Article} from "./article";

export class HomeApi {

    static getArticleList = getHomeArticleList

}

interface Response<T> {
    status: number
    msg: string
    data: T
}

function getClasses(){

}

function getHomeArticleList() {

    get("/dengzi")

}

