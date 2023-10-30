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

    const [ updateTask,{ error } ] = useUpdateTaskMutation()

    const handleCancelUpdateOnClick = useCallback(() => {
        dispatch(resetCurrentTask())
        dispatch(setModalClose('submit-update'))
    }, [])

    const handleUpdateTaskOnClick = useCallback(async () => {
        if (displayedTask && currentTask) {
            const { name, description, date, type } = currentTask
            const result: any = await updateTask({ // TODO type any
                id: displayedTask.id as number,
                task: {
                    name,
                    description,
                    date,
                    type,
                    tags: [],
                }
            })
            dispatch(updateTaskThunk(result.error ? false : true))
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
            >Подтвердите обновление задачи
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