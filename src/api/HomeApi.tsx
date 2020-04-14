import React from "react";
import {Rxios} from "./rxios";

const rxios = new Rxios();

export class HomeApi {

    static getArticleList = getHomeArticleList

}

interface Response<T> {
    status: number
    msg: string
    data: T
}

function getClasses() {

}

function getHomeArticleList() {

    rxios.get<string>("/dengzi").subscribe(
        res => {
            console.log(res)
        }, error => {
            console.log('出错啦');
            console.log(error)
        }, () => {
            console.log("request complete")
        })
}

