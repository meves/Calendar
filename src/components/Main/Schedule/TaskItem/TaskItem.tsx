import React, { DragEvent, MutableRefObject, useCallback } from "react";
import styles from './index.module.scss'
import { Task } from "../../../../rest-api/types";
import { useAppDispatch } from '../../../../store/hooks'
import { showDisplayedTaskThunk } from "../../../../store/slices/tasksSlice";

export const TaskItem = ({
    task,
    draggableTaskItem
} : {
    task: Task
    draggableTaskItem: MutableRefObject<Task | undefined>
}) => {
    const dispatch = useAppDispatch()
    
    const handleDisplyTaskOnClick = useCallback(() => {
        dispatch(showDisplayedTaskThunk(task))
    }, [task])

    const handleOnDragStart = useCallback((event: DragEvent<HTMLDivElement>, task: Task) => {
        draggableTaskItem.current = task
    }, [task])

    return (
        <div 
            className={styles.wrapper}
            onClick={handleDisplyTaskOnClick}
            draggable="true"
            onDragStart={event => handleOnDragStart(event, task)}
        >
            <p className={styles.title}>{task.name}</p>
        </div>
    )
}