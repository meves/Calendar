import { Draggable, UpdateTask } from './../types';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../rest-api/types";
import { AppDispatch, RootState } from "../redux-store";
import { setModalClose, setModalOpen } from "./modalSlice";
import { TASK_CREATED, TASK_DELETED, TASK_NOT_CREATED, TASK_NOT_DELETED, TASK_NOT_UPDATED, TASK_UPDATED } from '../constants';

export interface TasksState {
    tasks: Task[]
    currentTask: Task | null
    displayedTask: Task | null
    draggableTask: Task | null
    actionMessage: string
}

const initialState: TasksState = {
    tasks: [],
    currentTask: null,
    displayedTask: null,
    draggableTask: null,
    actionMessage: ''
}

export const tasksSlise = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.concat(action.payload)            
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
        },
        setCurrentTask: (state, action: PayloadAction<Task>) => {
            state.currentTask = action.payload
        },
        resetCurrentTask: (state, action: PayloadAction) => {
            state.currentTask = null
        },
        setDisplayedTask: (state, action: PayloadAction<Task>) => {
            state.displayedTask = action.payload
        },
        resetDisplayedTask: (state, action: PayloadAction) => {
            state.displayedTask = null
        },
        setDraggableTask: (state, action: PayloadAction<Task>) => {
            state.draggableTask = state.tasks.filter(task => task.id === action.payload.id)[0]
        },
        resetDraggableTask: (state, action: PayloadAction) => {
            state.draggableTask = null
        },
        changeDateAtDraggableTask: (state, action: PayloadAction<Draggable>) => {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.task.id) {
                    task.date = action.payload.date
                }
                return task
            })
        },
        setActionMessage: (state, action: PayloadAction<string>) => {
            state.actionMessage = action.payload
        },
        resetActionMessage: (state, action: PayloadAction) => {
            state.actionMessage = ''
        },        
    }
})

export const {
    setTasks,
    addTask,
    setCurrentTask,
    resetCurrentTask,
    setDisplayedTask,
    resetDisplayedTask,
    changeDateAtDraggableTask,
    setDraggableTask,
    resetDraggableTask,
    setActionMessage,
    resetActionMessage,
    deleteTask,
    updateTask

} = tasksSlise.actions

export default tasksSlise.reducer

export const selectTasks = (state: RootState) => state.tasks

export const createTaskThunk = (task: Task, isSuccess: boolean) =>
    async (dispatch: AppDispatch) => {
        if (isSuccess) {
            dispatch(addTask(task))
            dispatch(resetCurrentTask())
            dispatch(setModalClose('new-task'))
            dispatch(setActionMessage(TASK_CREATED))
        }
        else {
            dispatch(setActionMessage(TASK_NOT_CREATED))
        }
        dispatch(setModalClose('submit-create'))
    }

export const showDisplayedTaskThunk = (task: Task) =>
    async (dispatch: AppDispatch) => {
        dispatch(setDisplayedTask(task))
        dispatch(setModalOpen('task-data'))
    }

export const closeSubmitDeletedThunk = () =>
    async (dispatch: AppDispatch) => {
        dispatch(resetDisplayedTask())
        dispatch(setModalClose('submit-delete'))        
    }

export const deleteTaskThunk = (id: number, isSuccess: boolean) =>
    async (dispatch: AppDispatch) => {
        if (isSuccess) {
            dispatch(deleteTask(id))
            dispatch(setActionMessage(TASK_DELETED))
        } else {
            dispatch(setActionMessage(TASK_NOT_DELETED))            
        }
        dispatch(closeSubmitDeletedThunk())
    }

export const updateTaskThunk = (task: Task, isSuccess: boolean) =>
    async (dispatch: AppDispatch) => {
        if (isSuccess) {
            dispatch(updateTask(task))
            dispatch(resetCurrentTask())
            dispatch(resetDisplayedTask())
            dispatch(setModalClose('new-task'))
            dispatch(setActionMessage(TASK_UPDATED))
        } else {
            dispatch(setActionMessage(TASK_NOT_UPDATED))            
        }
        dispatch(setModalClose('submit-update'))
    }

export const updateDraggableTaskThunk = (draggable: Draggable) =>
    async (dispatch: AppDispatch) => {
        dispatch(changeDateAtDraggableTask(draggable))
        dispatch(setDraggableTask(draggable.task))
    }