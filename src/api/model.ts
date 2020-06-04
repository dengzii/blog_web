export interface Profile {
    name: string
    site_name: string
    avatar: string
    email: string
    bio: string
    links: string
    likes: number
    follower: number
    following: number
    github: string
    views: number
}

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
    category_name: string
    tag: Tag
    category: Category
}

export interface Archive {
    created_at: number
    title: string
    article_id: number
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
}

export interface Category {
    name: string
    id: number
}