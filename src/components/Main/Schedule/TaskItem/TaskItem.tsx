import React, { DragEvent, MouseEvent, MutableRefObject, useCallback } from "react";
import styles from './index.module.scss'
import { Task } from "../../../../rest-api/types";
import { useAppDispatch } from '../../../../store/hooks'
import { showDisplayedTaskThunk } from "../../../../store/slices/tasksSlice";
import { setModalClose } from "../../../../store/slices/modalSlice";

export const TaskItem = ({
    task,
    draggableTaskItem
} : {
    task: Task
    draggableTaskItem: MutableRefObject<Task | undefined>
}) => {
    const dispatch = useAppDispatch()
    
    const handleDisplyTaskOnClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        dispatch(showDisplayedTaskThunk(task))
        document.body.onclick = function() {
            dispatch(setModalClose('task-data'))
        }
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