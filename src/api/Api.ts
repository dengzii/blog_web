import {Rxios} from "./rxios";
import {Observable} from "rxjs";
import {About, Archive, Article, Category, Friend, Profile} from "./model";

const rxios = new Rxios();

interface Response<T> {
    status: number
    msg: string
    data: T
}

export function getProfile(): Observable<Response<Profile>> {
    return rxios.get<Response<Profile>>(`/dengzi/profile`)
}

export function getArticleDetail(id: number, view: boolean = false): Observable<Response<Article>> {
    return rxios.get<Response<Article>>(`/dengzi/article/${id}?view=${view}`)
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

export function viewSite(): Observable<Response<void>> {
    return rxios.patch<Response<void>>("/dengzi/user/views")
}

export function login(username: string, password: string): Observable<Response<any>> {
    return rxios.post<Response<any>>("/dengzi/login", {username: username, password: password})
}