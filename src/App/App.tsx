import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import styles from './App.module.scss'
import { Loader } from "../components/shared/Loader/Loader";
import { useAppDispatch } from "../store/hooks";
import { initializeApp } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const App = () => {
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeApp())
            .then(result => {
                result ? navigate('/') : navigate('/login')
            })
            .catch(error => {
                navigate('/error')
            })
            .finally(() => 
                setIsLoading(false)
            )
    }, [dispatch])

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className={styles.appContainer}>
            <AppRouter/>
        </div>
    )
}