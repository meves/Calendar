import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectAuth } from "../store/slices/authSlice";
import HomePage from "../pages/HomePage/HomePage";
import { withSuspense } from "./hoc/withSuspense";

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/ErrorPages/NotFounPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPages/ErrorPage"));

const AppRouter = () => {
    const { isAuth } = useAppSelector(selectAuth)

    return (
        <Routes>
        {isAuth ?
            <Route path="/" element={<HomePage/>}/> :
            <Route path="/login" element={withSuspense(LoginPage)}/>            
        }
            <Route path="/error" element={withSuspense(ErrorPage)} />
            <Route path="/*" element={withSuspense(NotFoundPage)}/>
        </Routes>
    )
}

export default AppRouter