export interface Token {
    token: string
    type: string
}

export interface SavedToken extends Token {
    date: Date
}

export type LoginData = {
    login: string
    password: string
}

export type Task = {
    id?: number
    name: string
    description: string | null
    date: string
    type: number
    tags: number[]
    timestamp?: string
}