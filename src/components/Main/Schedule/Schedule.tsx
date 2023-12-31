import React, { DragEvent, useCallback, useEffect, useRef } from "react";
import styles from './index.module.scss'
import { TaskItem } from "./TaskItem/TaskItem";
import { useGetTasksQuery } from "../../../store/services/tasksService";
import { Loader } from "../../shared/Loader/Loader";
import { getDayMonthFormat } from "../../utils/getDayMonthFormat";
import { getNameOfDayOfTheWeek } from "../../utils/getNameOfDayOfTheWeek";
import { v4 as uuidv4 } from 'uuid'
import { generateDaysOfWeeks } from "../../utils/generateDaysOfWeeks";
import { Task } from "../../../rest-api/types";
import { isCurrentDate } from "../../utils/isCurrentDate";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectTasks, setTasks, updateDraggableTaskThunk } from "../../../store/slices/tasksSlice";
import { Notify } from "../../shared/Notify/Notify";
import ErrorPage from "../../../pages/ErrorPages/ErrorPage";

export const Schedule = ({
    startDate,
    endDate,
    currentDate
} : {
    startDate: string
    endDate: string
    currentDate: Date
}) => {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks).tasks

    const { data, error, isLoading, isFetching } = useGetTasksQuery({startDate, endDate})

    useEffect(() => {
        if (data?.result) {
            dispatch(setTasks(data.result))
        }        
    }, [data])

    const draggableTaskItem = useRef<Task>()

    const handleDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.draggable = false
    }, [])

    const handleDragEnd = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.draggable = true
        event.currentTarget.style.border = 'none'
    }, [])

    const handleOnDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()        
    }, [draggableTaskItem])

    const handleOnDragEner = useCallback((event: DragEvent<HTMLDivElement>) => {
        if (draggableTaskItem.current) {
            event.currentTarget.style.border = '1px solid #111'
        }
    }, [])

    const handleOnDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.border = 'none'
    }, [])

    const handleOnDrop = useCallback((event: DragEvent<HTMLDivElement>, date: string) => {
        event.preventDefault()
        if (draggableTaskItem.current) {
            const task = draggableTaskItem.current
            draggableTaskItem.current = undefined
            dispatch(updateDraggableTaskThunk({task, date}))
        }
        event.currentTarget.style.border = 'none' 
    }, [draggableTaskItem.current])

    const days: number[] = []    
    for(let i = 0; i < 7; i++) {
        days.push(i)
    }    

    if (isLoading || isFetching) {
        return <Loader/>
    }

    if (error) {
        return <ErrorPage/>
    }
    
    return (
        <main className={styles.wrapper}>
            {days.map(day => (
                <section 
                    key={uuidv4()}
                    className={`${styles.column} ${isCurrentDate(currentDate, startDate, day) ? styles.currentDate : ''}`}
                >
                    <div 
                        className={styles.cell}
                    >
                        <span>{ getNameOfDayOfTheWeek(generateDaysOfWeeks(startDate, day)) }</span>
                        <span>{ getDayMonthFormat(generateDaysOfWeeks(startDate, day)) }</span>
                    </div>

                    <div 
                        className={styles.tasks}
                        draggable="true"
                        onDragOver={handleOnDragOver}
                        onDrop={event => handleOnDrop(event, generateDaysOfWeeks(startDate, day))}
                        onDragEnter={handleOnDragEner}
                        onDragLeave={handleOnDragLeave}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        {tasks.map((item: Task) => (
                            generateDaysOfWeeks(startDate, day) === item.date ?
                            <TaskItem
                                key={uuidv4()}
                                task={item}
                                draggableTaskItem={draggableTaskItem}
                            /> : null
                        ))}
                    </div>
                </section>
            ))}
            <Notify/>
        </main>
    )
    
}