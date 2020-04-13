import axios, {AxiosInstance, AxiosPromise} from "axios";
import {Observable} from 'rxjs'

const instance = axios.create({
    timeout: 5000,
    baseURL: "http://localhost:8000/"
});

interface HttpResponse {
    status: number;
    msg: string;
    headers: any;
    data: any;
}

// noinspection SpellCheckingInspection
class rxios {
    private _axios: AxiosInstance;

    constructor() {
        this._axios = axios.create()
    }

    public post<T>(url: string, data?: any) {

    }

    public get<T>(url: string) {

    }

    public put<T>(url: string, data?: any) {

    }

    public fromAxios() {
        return new Observable(observer => {

        })
    }
}

export function post(path: string, param: any): Observable<HttpResponse> {
    return fromAxios(instance.post(path, param))
}

export function get(path: string): Observable<HttpResponse> {
    return fromAxios(instance.get(path))
}


function fromAxios(promise: AxiosPromise): Observable<HttpResponse> {
    return new Observable(observer => {
        promise.then((res) => {
            observer.next({
                status: res.status,
                msg: res.statusText,
                headers: res.headers,
                data: res.data
            });
            observer.complete()
        }).catch(error => {
            observer.error(error);
            observer.complete()
        });
    });
}