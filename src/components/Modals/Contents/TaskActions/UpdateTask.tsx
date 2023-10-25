import React, { useCallback, useEffect } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { resetCurrentTask, selectTasks, updateTaskThunk } from "../../../../store/slices/tasksSlice";
import { useUpdateTaskMutation } from "../../../../store/services/tasksService";
import { setModalClose } from "../../../../store/slices/modalSlice";

export const UpdateTask = () => {
    const dispatch = useAppDispatch()

    const { displayedTask, currentTask, draggableTask } = useAppSelector(selectTasks)

    const [ updateTask,{ error, status, data } ] = useUpdateTaskMutation()

    const handleCancelUpdateOnClick = useCallback(() => {
        dispatch(resetCurrentTask())
        dispatch(setModalClose('submit-update'))
    }, [])

    const handleUpdateTaskOnClick = useCallback(() => {
        if (displayedTask && currentTask) {
            const { name, description, date, type } = currentTask
            displayedTask && updateTask({
                id: displayedTask.id as number,
                task: {
                    name,
                    description,
                    date,
                    type,
                    tags: [],
                }
            })
            dispatch(updateTaskThunk())
        }
    }, [displayedTask, currentTask])

    useEffect(() => {
        if (draggableTask) {
            updateTask({id: draggableTask.id as number, task: draggableTask })
        }
    }, [draggableTask])

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подвтвердите обновление задачи
            </h2>
            <div className={styles.buttons}>
                <button
                    className={classNames(styles.button, styles.cancel)}
                    onClick={handleCancelUpdateOnClick}
                >Отмена
                </button>
                <button
                    className={classNames(styles.button, styles.create)}
                    onClick={handleUpdateTaskOnClick}
                >Обновить
                </button>
            </div>
        </div>
    )
}