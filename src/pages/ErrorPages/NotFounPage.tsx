import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlice";
import styles from './index.module.scss'

const NotFoundPage = () => {
    const { isAuth } = useAppSelector(selectAuth)

    return (
        <div className={styles.wrapper}>
            <h2>Страница, которую в ищете, не существует</h2>
            <NavLink to={isAuth ? "/" : "/login"}>Назад</NavLink>
        </div>
    )
}

export default NotFoundPage