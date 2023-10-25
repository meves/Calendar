import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import styles from './index.module.scss'
import { REQUIRED } from "../../../Login/libs/constants";
import { validate } from "../../../Login/libs/validators";
import { InputName } from "../../../Login/libs/types";
import { displayError } from "../../../Login/libs/displayError";
import { resetCurrentTask, resetDisplayedTask, selectTasks, setCurrentTask } from "../../../../store/slices/tasksSlice";
import { setModalClose, setModalOpen } from "../../../../store/slices/modalSlice";
import classNames from "classnames";
import { TaskTypes } from "../../../Login/libs/enum";

const initialState = {name: '', description: '', date: '', type: ''}
const initialErrors = {name: '', description: '', date: '', type: ''}

export const AddNewtask = () => {
    const dispatch = useAppDispatch()
    
    const { displayedTask } = useAppSelector(selectTasks)

    useEffect(() => {
        if (displayedTask) {
            const { name, description, date, type } = displayedTask
            setInputState({
                name,
                description: String(description),
                date,
                type: String(type)
            })
        } else {
            setInputState(initialState)
        }
    }, [displayedTask])

    const [errors, setErrors] = useState(initialErrors)

    const [inputState, setInputState] = useState(initialState)

    const handleAddTaskNameOnChange = useCallback((
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.currentTarget
        setInputState(prev => ({...prev, [name]: value}))
        value ?
            setErrors(prev => ({...prev, [name]: ''})) :
            setErrors(prev => ({...prev, [name]: REQUIRED}))
    }, [])

    const handleCloseFormOnClick = useCallback(() => {
        dispatch(resetCurrentTask())
        dispatch(resetDisplayedTask())
        dispatch(setModalClose('new-task'))
        setErrors(initialErrors)
        setInputState(initialState)
    }, [initialErrors, initialState])
    
    const handleOnSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        for (let entry of Object.entries(inputState)) {
            const name = entry[0] as InputName
            const value = entry[1]
            if (!value) {
                return setErrors(prev => ({...prev, [name]: REQUIRED}))
            }
            if (!validate(name, value)) {
                return setErrors(prev => ({...prev, [name]: displayError(name)}))
            }
        }

        dispatch(setCurrentTask({
                name: inputState.name,
                description: inputState.description,
                date: inputState.date,
                type: Number(inputState.type),
                tags: []
            })
        )
        displayedTask ? dispatch(setModalOpen('submit-update')) : dispatch(setModalOpen('submit-create'))
    }, [inputState])

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleOnSubmitForm}>

                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>{displayedTask ? 'Изменить ' : 'Создать '}задачу</legend>
                    
                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="name">Название задачи</label>
                        <input 
                            className={styles.input}
                            name="name"
                            id="name"
                            value={inputState.name}
                            onChange={handleAddTaskNameOnChange}
                            autoComplete="off"
                        />
                        <div className={styles.error}>{errors.name}</div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="description">Описание задачи</label>
                        <textarea 
                            className={styles.textarea}
                            name="description" 
                            id="description" 
                            cols={30} 
                            rows={5}
                            wrap="hard"
                            value={inputState.description}
                            onChange={handleAddTaskNameOnChange}
                        />
                        <div className={styles.error}>{errors.description}</div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="date">Выберите дату</label>
                        <input 
                            className={styles.input}
                            type="date"
                            name="date"
                            id="date"
                            value={inputState.date}
                            onChange={handleAddTaskNameOnChange}
                            autoComplete="off"
                        />
                        <div className={styles.error}>{errors.date}</div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="type">Выберите тип</label>
                        <select 
                            className={classNames(styles.input, styles.select)}
                            name="type" 
                            id="type"
                            value={inputState.type}
                            onChange={handleAddTaskNameOnChange}
                        >
                            <option>Выберите из списка</option>
                            <option value="1">{TaskTypes.Current}</option>
                            <option value="2">{TaskTypes.Important}</option>
                            <option value="3">{TaskTypes.Urgent}</option>
                        </select>
                        <div className={styles.error}>{errors.type ?? errors.type}</div>
                    </div>

                    <div className={styles.buttons}>
                    <button
                            className={classNames(styles.cancel, styles.button)}
                            onClick={handleCloseFormOnClick}
                        >Закрыть окно
                        </button>
                        <button
                            className={styles.button}
                            type="submit"
                        >{displayedTask ? 'Изменить ' : 'Создать '}задачу
                        </button>
                    </div>
                </fieldset>
            </form>

        </div>
    )
}