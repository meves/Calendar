import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import { baseURL } from '../../rest-api'
import { Task } from '../../rest-api/types'
import { RootState } from '../redux-store'
import { Dates, UpdateTask } from '../types'

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    tagTypes: ['Task'],
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<{result: Task[]}, Dates>({
            query: (dates) => ({
                url: `tasks/?start_date=${dates.startDate}&end_date=${dates.endDate}`
            }),
            providesTags: ['Task']
        }),
        getTaskById: builder.query<Task, number>({
            query: (id) => ({
                url: `tasks/${id}`
            }),
            providesTags: ['Task']
        }),
        createTask: builder.mutation<Task, Task>({
            query: (task) => ({
                url: `tasks`,
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: builder.mutation<Task, UpdateTask>({
            query: (arg) => ({
                url: `tasks/${arg.id}`,
                method: 'PUT',
                body: arg.task
            }),
            invalidatesTags: ['Task']
        }),
        deleteTask: builder.mutation<string, number>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Task']
        })
    })
})

export const { 
    useGetTasksQuery,
    useGetTaskByIdQuery, 
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = tasksApi