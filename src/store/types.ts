import { Task } from "../axios/types"

export type Dates = {startDate: string, endDate: string}

export type UpdateTask = {
    id: number
    task: Task
}

export type Draggable = {
    task: Task
    date: string
}

export type Sorting = 'importance' | 'date'