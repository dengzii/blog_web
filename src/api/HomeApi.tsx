import React from "react";
import {Observable, Subscribable, Subscriber} from "rxjs";
import RuntimeError = WebAssembly.RuntimeError;

const axios = require("axios");

const baseUrl = "localhost";

export class HomeApi {

    static getArticleList = getHomeArticleList

}

function getHomeArticleList() {

    let request = {1: "", 2: ""};
    axios.get("")
        .fromEntries(request)
        .then()
        .progress((progress: any) => {

        })
        .catch((reason: string) => {
            console.log(reason)
        });

}

abstract class AbsRequestObservable<R, T> {

    private _observer?: Subscribable<T>;
    private _observable: Observable<R>;
    protected _request?: R;

    protected constructor() {
        this._observable = new Observable<R>(this.onSubscribe);

    }

    abstract onSubscribe(subscriber: Subscriber<R>): void

    subscribe(observer: (res: T) => void): this {
        if (this._observer === undefined) {
            throw RuntimeError
        }
        this._observer.subscribe((r) => {
            observer(r)
        });
        return this
    }
}

function f(s: number): void {

}

