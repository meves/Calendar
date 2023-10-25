import React, { ChangeEvent, FormEvent, useCallback,useState } from "react";
import styles from './index.module.scss';
import { REQUIRED } from "./libs/constants";
import { validate } from "./libs/validators";
import { useAppDispatch } from "../../store/hooks";
import { loginThunk } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { InputName } from "./libs/types";
import { displayError } from "./libs/displayError";

const initialState = { login: '', password: '' }

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [errors, setErrors] = useState(initialState)

    const [inputState, setInputState] = useState(initialState)

    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setInputState(prev => ({...prev, [name]: value}))
        value ?
            setErrors(prev => ({...prev, [name]: ''})) :
            setErrors(prev => ({...prev, [name]: REQUIRED}))
    }, [])

    const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
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
        
        dispatch(loginThunk(inputState))
            .then(error => {
                error ? setErrors({ login: error, password: error }) : navigate('/')
            })
            .catch(error => {
                navigate('/error')
            })
            .finally(() => {
                setInputState(initialState)
                setErrors(initialState)
            })
        
    }, [inputState])

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmitForm}    
        >
            <legend className={styles.legend}>
                Авторизация
            </legend>
            <fieldset
                className={styles.fieldset}
            >
                <div className={styles.inputWrapper}>
                    <label 
                        className={styles.label}
                        htmlFor="login"
                    >Логин
                    </label>
                    <input 
                        className={styles.input}
                        type="text"
                        placeholder="Введите имя пользователя"
                        id="login"
                        name="login"
                        value={inputState.login}
                        onChange={handleInputOnChange}
                        autoComplete="username"
                    />
                    <div className={styles.error}>{errors.login}</div>
                </div>

                <div className={styles.inputWrapper}>
                    <label 
                        className={styles.label}
                        htmlFor="password"
                    >Пароль
                    </label>
                    <input 
                        className={styles.input}
                        type="password"
                        placeholder="Введите пароль"
                        id="password"
                        name="password"
                        value={inputState.password}
                        onChange={handleInputOnChange}
                        autoComplete="current-password"                    
                    />
                    <div className={styles.error}>{errors.password}</div>
                </div>
                <button
                    className={styles.submitButton}
                    type="submit"
                >Войти
                </button>
            </fieldset>
        </form>
    )
}