import {Rxios} from "./rxios";
import {Observable} from "rxjs";
import {About, Archive, Article, Category, Friend} from "./model";


const rxios = new Rxios();

interface Response<T> {
    status: number
    msg: string
    data: T
}

export function getArticleList(last: number, category: string): Observable<Response<Article[]>> {

    return rxios.get<Response<Article[]>>(`/dengzi?last=${last}&category=${category}`)
}

export function getCategories(): Observable<Response<Category[]>> {

    return rxios.get<Response<Category[]>>(`/dengzi/category`)
}

export function getArchives(): Observable<Response<Archive[]>> {
    return rxios.get<Response<Archive[]>>(`/dengzi/archive`)
}

export function getAbout(): Observable<Response<About>> {
    return rxios.get<Response<About>>(`/dengzi/about`)
}

export function getFriends(): Observable<Response<Friend[]>> {
    return rxios.get<Response<Friend[]>>(`/dengzi/friend`)
}

export function putFriends(friend: Friend): Observable<Response<void>> {
    return rxios.put<Response<void>>("/dengzi/friend", friend)
}