import React, { useCallback } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { closeSubmitDeletedThunk, deleteTaskThunk, selectTasks } from "../../../../store/slices/tasksSlice";
import { useDeleteTaskMutation } from "../../../../store/services/tasksService";

export const DeleteTask = () => {
    const dispatch = useAppDispatch()

    const { displayedTask } = useAppSelector(selectTasks)

    const [ deleteTask, { error } ] = useDeleteTaskMutation()

    const handleCancelDeleteOnClick = useCallback(() => {
        dispatch(closeSubmitDeletedThunk())
    }, [])

    const handleDeleteTaskOnClick = useCallback(async () => {
        if (displayedTask?.id) {
            const result: any = await deleteTask(displayedTask.id) // TODO type any
            dispatch(deleteTaskThunk(displayedTask.id, result.error ? false : true))
        }
    }, [displayedTask, displayedTask?.id])

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подтвердите удаление задачи
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