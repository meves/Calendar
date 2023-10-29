import React, { useCallback, useEffect } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setModalClose } from "../../../../store/slices/modalSlice";
import { createTaskThunk, selectTasks } from "../../../../store/slices/tasksSlice";
import { useCreateTaskMutation } from "../../../../store/services/tasksService";
import { Task } from "../../../../rest-api/types";
import { Loader } from "../../../shared//Loader/Loader";

export const CreateTask = () => {
    const dispatch = useAppDispatch()
    const [createTask, { error, data, isLoading }] = useCreateTaskMutation()

    const currentTask = useAppSelector(selectTasks).currentTask as Task

    const handleCancelOnClick = useCallback(() => {
        dispatch(setModalClose('submit-create'))
    }, [])

    const handleCreateOnClick = useCallback(() => {                
        createTask(currentTask)
    }, [currentTask])

    useEffect(() => {
        dispatch(createTaskThunk(data as Task))
    }, [data])

    if (isLoading) return <Loader/>

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подвтвердите создание новой задачи
            </h2>
            {error && <p>Не удалось создать задачу</p>}
            <div className={styles.buttons}>
                <button
                    className={classNames(styles.button, styles.cancel)}
                    onClick={handleCancelOnClick}
                >Отмена
                </button>
                <button
                    className={classNames(styles.button, styles.create)}
                    onClick={handleCreateOnClick}
                >Создать
                </button>
            </div>
        </div>
    )
}