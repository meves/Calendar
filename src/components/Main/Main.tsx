import React, { useState } from "react";
import styles from './index.module.scss'
import { ButtonsBlock } from "./ButtonsBlock/ButtonsBlock";
import { getStartEndDates } from "../utils/getStartEndDates";
import { Schedule } from "./Schedule/Schedule";

export const Main = () => {
    const [currentDate, setcurrentDate] = useState(new Date())

    const [{startDate, endDate}, setDates] = useState(() => {
        return getStartEndDates(currentDate)
    })

    return (
        <main className={styles.main}>
            <ButtonsBlock
                setDates={setDates}
                startDate={startDate}
            />
            <Schedule
                startDate={startDate}
                endDate={endDate}
                currentDate={currentDate}
            />
        </main>
    )
}