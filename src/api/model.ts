export interface Article {
    id: number
    title: string
    author_name: string
    created_at: number
    updated_at: number
    description: string
    likes: number
    views: number
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