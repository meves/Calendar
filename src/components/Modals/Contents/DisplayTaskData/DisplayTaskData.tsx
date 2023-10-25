import React, { useCallback, useEffect } from "react";
import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectTasks } from "../../../../store/slices/tasksSlice";
import { displayTaskType, getDateToDisplayTask, getFullNameOfWeekDay } from "../../../utils";
import classNames from "classnames";
import { setModalOpen, setModalClose } from "../../../../store/slices/modalSlice";

export const DisplayTaskData = () => {
    const { displayedTask } = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const handleUpdateTaskOnClick = useCallback(() => {
        dispatch(setModalOpen('new-task'))
    }, [])

    const handleDeleteTaskOnClick = useCallback(() => {
        dispatch(setModalOpen('submit-delete'))
    }, [])

    useEffect(() => {
        const modal = document.getElementById('modal')
        if (modal) {
            modal.onclick = function() {
                dispatch(setModalClose('task-data'))
            }
        }
        return () => {
            if (modal) {
                modal.onclick = null
            }
        }
    }, [])

    return (
        <article className={styles.wrapper}>
            <h2>{displayedTask?.name}</h2>
            
            <section className={styles.taskData}>
                <div className={styles.row}>
                    <span>Описание</span>
                    <span>{displayedTask?.description}</span>
                </div>
                <div className={styles.row}>
                    <span>Дата</span>
                    <span>{getDateToDisplayTask(displayedTask?.date)} ({getFullNameOfWeekDay(displayedTask?.date)})</span>
                </div>
                <div className={styles.row}>
                    <span>Тип</span>
                    <span 
                        className={`${styles.type} ${displayedTask?.type === 1 ? styles.current : displayedTask?.type === 2 ? styles.important : styles.urgent}`}
                    >
                        {displayTaskType(displayedTask?.type)}
                    </span>
                </div>
                <div className={styles.buttons}>
                    <button
                        className={styles.button}
                        onClick={handleUpdateTaskOnClick}
                    >
                        Изменить задачу
                    </button>
                    <button
                        className={classNames(styles.button, styles.deleteButton)}
                        onClick={handleDeleteTaskOnClick}
                    >
                        Удалить задачу
                    </button>
                </div>
            </section>                    
        </article>
    )
}