import React from "react";
import {Observable, Subscribable, Subscriber} from "rxjs";
import axios from 'axios'

const baseUrl = "localhost";
const instance = axios.create({
    timeout: 5000,
    baseURL: "http://localhost:8000/"
});

export class HomeApi {

    static getArticleList = getHomeArticleList

}

function getHomeArticleList() {
    instance.get("/dengzi")
        .catch((reason: string) => {
            console.log(reason)
        });

}

abstract class AbsRequestObservable<R, T> {

    protected _request?: R;
    private _observer?: Subscribable<T>;
    private _observable: Observable<R>;

    protected constructor() {
        this._observable = new Observable<R>(this.onSubscribe);

    }

    abstract onSubscribe(subscriber: Subscriber<R>): void

    //
    // subscribe(observer: (res: T) => void): this {
    //     if (this._observer === undefined) {
    //         return ;
    //     }
    //     this._observer.subscribe((r) => {
    //         observer(r)
    //     });
    //     return this
    // }
}

function f(s: number): void {

}

