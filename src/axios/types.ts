export type Token = {
    token: string
    type: string
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