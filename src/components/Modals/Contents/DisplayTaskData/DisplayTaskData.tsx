import React, { MouseEvent, useCallback, useEffect } from "react";
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

    const handleArticleOnClic = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.nativeEvent.stopImmediatePropagation()
    }, [])

    const handleCloseTaskDataOnClick = useCallback(() => {
        dispatch(setModalClose('task-data'))
        document.body.onclick = null
    }, [])

    return (
        <article 
            className={styles.wrapper}
            onClick={handleArticleOnClic}  
        >
            <div 
                className={styles.cross}
                onClick={handleCloseTaskDataOnClick}
            >&#10008;
            </div>
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
                    <span>
                        <span 
                            className={`${styles.type} ${displayedTask?.type === 1 ? styles.current : displayedTask?.type === 2 ? styles.important : styles.urgent}`}
                        >{displayTaskType(displayedTask?.type)}
                        </span>
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