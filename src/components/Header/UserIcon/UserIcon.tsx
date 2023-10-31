import React, { MouseEvent, useCallback, useEffect, useState } from "react";
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

    const closeDropdownMenu = useCallback(function() {
        setDropdownIsOpen(false)
    }, [])

    useEffect(() => {
        if (dropdownIsOpen) {
            document.body.addEventListener('click', closeDropdownMenu)

            return () => {
                document.body.removeEventListener('click', closeDropdownMenu)
            }
        }
    }, [dropdownIsOpen, closeDropdownMenu])

    const handleDropdownOnClick = useCallback((event: MouseEvent<HTMLParagraphElement>) => {
        event.nativeEvent.stopImmediatePropagation()
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