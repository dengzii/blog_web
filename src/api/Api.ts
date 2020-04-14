import {Rxios} from "./rxios";
import {Observable} from "rxjs";
import {Article} from "./model";


const rxios = new Rxios();

interface Response<T> {
    status: number
    msg: string
    data: T
}

export function getHomeArticleList(): Observable<Response<Article[]>> {

    return rxios.get<Response<Article[]>>("/dengzi")
}

