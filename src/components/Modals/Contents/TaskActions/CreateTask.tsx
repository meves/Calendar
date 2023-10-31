import React, { useCallback } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setModalClose } from "../../../../store/slices/modalSlice";
import { createTaskThunk, selectTasks } from "../../../../store/slices/tasksSlice";
import { useCreateTaskMutation } from "../../../../store/services/tasksService";
import { Task } from "../../../../rest-api/types";
import { Loader } from "../../../shared//Loader/Loader";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const CreateTask = () => {
    const dispatch = useAppDispatch()
    const [createTask, { error, data, isLoading }] = useCreateTaskMutation()
    
    const currentTask = useAppSelector(selectTasks).currentTask as Task

    const handleCancelOnClick = useCallback(() => {
        dispatch(setModalClose('submit-create'))
    }, [])

    const handleCreateOnClick = useCallback(async () => {
        const result: any = await createTask(currentTask) // TODO type any
        dispatch(createTaskThunk(currentTask, result.error ? false : true))
    }, [currentTask, error, createTask])

    if (isLoading) return <Loader/>

    return (
        <div className={styles.wrapper}>
            <h2 
                className={styles.title}
            >Подтвердите создание новой задачи
            </h2>
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