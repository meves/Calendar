import React, { Dispatch, SetStateAction, useCallback } from "react";
import styles from './index.module.scss'
import classNames from "classnames";
import { useAppDispatch } from "../../../store/hooks";
import { setModalOpen } from "../../../store/slices/modalSlice";
import { dayDuration } from "../../utils/constants";
import { Diapason } from "../../utils/types";
import { getStartEndDates } from "../../utils/getStartEndDates";
import { resetDisplayedTask } from "../../../store/slices/tasksSlice";

export const ButtonsBlock = ({
    startDate,
    setDates
} : {
    startDate: string
    setDates: Dispatch<SetStateAction<Diapason>>
}) => {
    const dispatch = useAppDispatch()

    const handleSetPrevDateOnclick = useCallback(() => {
        const prevStartDate = new Date(new Date(startDate).getTime() - dayDuration*6)
        const { startDate: start, endDate: end } = getStartEndDates(prevStartDate)
        setDates({ startDate: start, endDate: end }) 
    }, [startDate])

    const handleSetNextDateOnclick = useCallback(() => {
        const nextStartDate = new Date(new Date(startDate).getTime() + dayDuration*7)        
        const { startDate: start, endDate: end } = getStartEndDates(nextStartDate)
        setDates({ startDate: start, endDate: end }) 
    }, [startDate])

    const handleSetTodayOnClick = useCallback(() => {
        const { startDate, endDate } = getStartEndDates(new Date())
        setDates({ startDate, endDate })
    }, [])

    const handleAddNewTaskOnClick = useCallback(() => {
        dispatch(resetDisplayedTask())
        dispatch(setModalOpen('new-task'))
    }, [])

    return (
        <div className={styles.wrapper}>
            <button
                className={classNames(styles.button, styles.arrow)}
                onClick={handleSetPrevDateOnclick}
            >{`<`}
            </button>
            
            <button
                className={classNames(styles.button, styles.today)}
                onClick={handleSetTodayOnClick}
            >{`Сегодня`}
            </button>
            
            <button
                className={classNames(styles.button, styles.arrow)}
                onClick={handleSetNextDateOnclick}
            >{`>`}
            </button>
            
            <button
                className={classNames(styles.button, styles.addTask)}
                onClick={handleAddNewTaskOnClick}
            >{`Добавить задачу`}
            </button>
        </div>
    )
}