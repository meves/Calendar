import React from "react";
import { LoginForm } from "../../components/Login/LoginForm";
import styles from './index.module.scss'

const LoginPage = () => {
    return (
        <section className={styles.pageWrapper}>
            <LoginForm/>
        </section>
    )
}

export default LoginPage