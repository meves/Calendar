import React, { ReactNode } from "react"
import { useModal } from "../useModal"
import { createPortal } from "react-dom"
import styles from './index.module.scss'
import { useAppDispatch } from "../../../store/hooks"

export const ModalWrapper = ({
    children,
    isModalOpen
} : {
    children: ReactNode
    isModalOpen: boolean
}) => {
    const {domElement} = useModal(isModalOpen)

    const dispatch = useAppDispatch()
    
    return (
        createPortal(
            <div 
                className={styles.modal}
            >
                {children}
            </div>,
            domElement
        )
    )
}