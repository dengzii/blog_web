export interface Article {
    cid: number
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

export interface Archive {
    created_at: number
    title: string
    cid: number
}

export interface Friend {
    name: string
    desc: string
    url: string
    avatar: string
}

export interface About {
    content: string
    updated_at: number
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
    article_count: number
    id: number
}