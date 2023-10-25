import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query' 
import authReducer from './slices/authSlice'
import modalReducer from './slices//modalSlice'
import tasksReducer from './slices/tasksSlice'

import { tasksApi } from "./services/tasksService";

export const store = configureStore({   
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        tasks: tasksReducer,
        [tasksApi.reducerPath]: tasksApi.reducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tasksApi.middleware),
})

setupListeners(store.dispatch) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GetState = typeof store.getState