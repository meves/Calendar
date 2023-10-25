import React, { useCallback, useState } from "react";
import styles from './index.module.scss'
import { useAppDispatch } from "../../../store/hooks";
import { logoutThunk } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const UserIcon = ({
    initials
} : {
    initials: string
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const handleDropdownOnClick = useCallback(() => {
        setDropdownIsOpen(prev => !prev)
    }, [])

    const handleLogoutOnClick = useCallback(async () => {
        dispatch(logoutThunk())
        navigate('/login')
    }, [])

    return (
        <div className={styles.wrapper}>
            <p 
                onClick={handleDropdownOnClick}
                className={styles.initials}
            >{ initials }
            </p>
            <ul className={`${styles.list} ${dropdownIsOpen ? styles.visible : ''}`}>
                <li 
                    onClick={handleLogoutOnClick}
                    className={styles.item}
                >Выйти
                </li>
            </ul>
        </div>
    )
}