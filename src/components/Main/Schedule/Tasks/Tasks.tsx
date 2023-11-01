import React, { DragEvent, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectTasks, setTasks, updateDraggableTaskThunk } from "../../../../store/slices/tasksSlice";
import { generateDaysOfWeeks } from "../../../utils/generateDaysOfWeeks";
import { TaskItem } from "../TaskItem/TaskItem";
import { Task } from "../../../../rest-api/types";
import styles from './index.module.scss'
import { useGetTasksQuery } from "../../../../store/services/tasksService";
import { Loader } from "../../../shared/Loader/Loader";
import { useNavigate } from "react-router-dom";

export const Tasks = ({
    startDate,
    endDate,
    day
} : {
    startDate: string
    endDate: string
    day: number
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { data, error, isLoading, isFetching } = useGetTasksQuery({startDate, endDate})

    useEffect(() => {
        dispatch(setTasks(data?.result as Task[]))
    }, [data])

    const { tasks } = useAppSelector(selectTasks)

    const draggableTaskItem = useRef<Task>()

    const handleOnDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()        
    }, [draggableTaskItem])

    const handleOnDragEner = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.border = '1px solid #111'
    }, [])

    const handleOnDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.border = 'none'     
        console.log(event.currentTarget);           
    }, [])

    const handleOnDrop = useCallback((event: DragEvent<HTMLDivElement>, date: string) => {
        event.preventDefault()        
        console.log(event.currentTarget, event.target, date, draggableTaskItem.current);
        
        if (draggableTaskItem.current) {
            const task = draggableTaskItem.current
            dispatch(updateDraggableTaskThunk({task, date}))
        }
    }, [draggableTaskItem.current])

    if (isLoading || isFetching) {
        return <Loader/>
    }

    if (error) {
        navigate('/error')
    }

    return (
        <div 
            className={styles.tasks}
            draggable="true"
            onDragOver={handleOnDragOver}
            onDrop={event => handleOnDrop(event, generateDaysOfWeeks(startDate, day))}
            onDragEnter={handleOnDragEner}
            onDragLeave={handleOnDragLeave}
        >
            {tasks?.map((item: Task) => (
                generateDaysOfWeeks(startDate, day) === item.date ?
                <TaskItem
                    key={item.id}
                    task={item}
                    draggableTaskItem={draggableTaskItem}
                /> : null
            ))}
        </div>
    )
}