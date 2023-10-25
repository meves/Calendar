import { Draggable, Sorting } from './../types';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../axios/types";
import { AppDispatch, RootState } from "../redux-store";
import { ModalType, setModalClose, setModalOpen } from "./modalSlice";

export interface TasksState {
    tasks: Task[]
    currentTask: Task | null
    displayedTask: Task | null
    draggableTask: Task | null
}

const initialState: TasksState = {
    tasks: [],
    currentTask: null,
    displayedTask: null,
    draggableTask: null
}

export const tasksSlise = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
        addTask: (state, action: PayloadAction<Task>) => {
            if (state.tasks) {
                state.tasks = state.tasks.concat(action.payload)
            }
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
        }
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
    resetDraggableTask

} = tasksSlise.actions

export default tasksSlise.reducer

export const selectTasks = (state: RootState) => state.tasks

export const createTaskThunk = (task: Task) =>
    async (dispatch: AppDispatch) => {
        dispatch(addTask(task))
        dispatch(resetCurrentTask())
        dispatch(setModalClose('submit-create'))
        dispatch(setModalClose('new-task'))        
    }

export const showDisplayedTaskThunk = (task: Task) =>
    async (dispatch: AppDispatch) => {
        dispatch(setDisplayedTask(task))
        dispatch(setModalOpen('task-data'))
    }

export const deleteDisplayedTaskThunk = (modalType: ModalType) =>
    async (dispatch: AppDispatch) => {
        dispatch(resetDisplayedTask())
        dispatch(setModalClose(modalType))        
    }

export const updateTaskThunk = () =>
    async (dispatch: AppDispatch) => {
        dispatch(resetCurrentTask())
        dispatch(resetDisplayedTask())
        dispatch(setModalClose('submit-update'))
        dispatch(setModalClose('new-task'))
    }

export const updateDraggableTaskThunk = (draggable: Draggable) =>
    async (dispatch: AppDispatch) => {
        dispatch(changeDateAtDraggableTask(draggable))
        dispatch(setDraggableTask(draggable.task))
    }