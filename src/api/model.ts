export interface Article {
    id: number
    title: string
    date: number
    tags: Tag[]
    category: Category
    desc: string
    content: string
    class: any
}

export interface Comment {
    id: number
    name: string
    email: string
    site: string
    content: string
    reply: number
    at: number
}

export interface Tag {
    name: string
    id: number
    style: number
}

export interface Category {
    name: string
    id: number
}