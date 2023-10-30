import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetActionMessage, selectTasks } from "../../../store/slices/tasksSlice";

export const Notify = React.memo(({
    delay=3000
} : {
    delay?: number
}) => {
    const dispatch = useAppDispatch()

    const { actionMessage } = useAppSelector(selectTasks)
    
    const notify = (actionMessage?: string) => {
        actionMessage && toast(actionMessage)
    }

    useEffect(() => {
        notify(actionMessage)
        const timerId = setTimeout(() => {
            dispatch(resetActionMessage())
            clearTimeout(timerId)
        }, delay)
    }, [actionMessage])

    if (!actionMessage) {
        return null
    }

    return (
        <div style={{zIndex: '10'}}>
            <ToastContainer
                position="bottom-left"
                autoClose={delay}
                hideProgressBar={true}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        </div>
    )
})