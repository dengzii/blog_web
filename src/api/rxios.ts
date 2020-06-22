import axios, {AxiosInstance, AxiosPromise} from "axios";
import {Observable, OperatorFunction} from 'rxjs'
import {map} from "rxjs/operators"

const instance = axios.create({
    timeout: 5000,
    baseURL: "https://api.dengzii.com/"
});

interface HttpResponse {
    status: number;
    msg: string;
    headers: any;
    data: any;
}

interface NetworkError extends Error {

}

// noinspection SpellCheckingInspection
export class Rxios {
    private _axios: AxiosInstance;

    constructor() {
        this._axios = instance
    }

    public post<T>(url: string, data?: any): Observable<T> {
        return this.fromAxios(() => this._axios.post(url, data)).pipe(this.resolve<T>())
    }

    public put<T>(url: string, data?: any): Observable<T> {
        return this.fromAxios(() => this._axios.put(url, data)).pipe(this.resolve<T>())
    }

    public patch<T>(url: string, data?: any): Observable<T> {
        return this.fromAxios(() => this._axios.patch(url, data)).pipe(this.resolve<T>())
    }

    public get<T>(url: string): Observable<T> {
        return this.fromAxios(() => this._axios.get(url)).pipe(this.resolve<T>())
    }

    private resolve<T>(): OperatorFunction<HttpResponse, T> {
        return map<HttpResponse, T>(response => {
            if (response.status !== 200) {
                throw new Error(response.msg);
            }
            return response.data as T;
        })
    }

    private fromAxios(fn: () => AxiosPromise): Observable<HttpResponse> {
        return new Observable(observer => {
            fn().then((response) => {
                observer.next({
                    status: response.status,
                    msg: response.statusText,
                    headers: response.headers,
                    data: response.data
                });
                observer.complete();
            }).catch((error) => {
                observer.error(error);
                observer.complete();
            })
        })
    }
}