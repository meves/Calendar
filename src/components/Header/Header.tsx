import React from "react"
import styles from './index.module.scss'
import { UserIcon } from "../shared/UserIcon/UserIcon"

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Мои задачи</h1>
            <UserIcon initials="иа"/>
        </header>
    )
}