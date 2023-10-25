import React, { useCallback } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { deleteDisplayedTaskThunk, selectTasks } from "../../../../store/slices/tasksSlice";
import { useDeleteTaskMutation } from "../../../../store/services/tasksService";

export const DeleteTask = () => {
    const dispatch = useAppDispatch()

    const { displayedTask } = useAppSelector(selectTasks)

    const [ deleteTask ] = useDeleteTaskMutation()

    const handleCancelDeleteOnClick = useCallback(() => {
        dispatch(deleteDisplayedTaskThunk('submit-delete'))
    }, [])

    const handleDeleteTaskOnClick = useCallback(() => {
        if (displayedTask) {
            displayedTask.id && deleteTask(displayedTask.id)
        }
        dispatch(deleteDisplayedTaskThunk('submit-delete'))

    }, [displayedTask, displayedTask?.id])

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подвтвердите удаление задачи
            </h2>
            <div className={styles.buttons}>
                <button
                    className={classNames(styles.button, styles.cancel)}
                    onClick={handleCancelDeleteOnClick}
                >Отмена
                </button>
                <button
                    className={classNames(styles.button, styles.create)}
                    onClick={handleDeleteTaskOnClick}
                >Удалить
                </button>
            </div>
        </div>
    )
}