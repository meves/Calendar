import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectAuth } from "../../store/slices/authSlice";
import { NavLink } from "react-router-dom";
import styles from './index.module.scss'

const ErrorPage = () => {
    const { isAuth } = useAppSelector(selectAuth)

    return (
        <div className={styles.wrapper}>
            <h2>Что-то пошло не так</h2>
            <NavLink to={isAuth ? "/" : "/login"}>Назад</NavLink>
        </div>
    )
}

export default ErrorPage