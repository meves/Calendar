import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../redux-store"
import { checkTokenExpired, deleteFromLocalStorage, getFromLocalStorage, saveToLocalStorage } from "../local-storage/utils"
import { TOKEN } from "../local-storage/constants"
import { LoginData, SavedToken } from "../../rest-api/types" 
import { authApi } from "../../rest-api/auth-api"
import { StatusCodes } from "../../rest-api/status-codes"
import { BAD_REQUEST, NOT_AUTHORIZED, SERVER_ERROR } from "../constants"

interface AuthState {
    isAuth: boolean
    token: string
}

const initialState: AuthState = {
    isAuth: false,
    token: ''
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction) => {
            state.isAuth = true
        },
        resetIsAuth: (state, action: PayloadAction) => {
            state.isAuth = false
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const {
    setIsAuth,
    resetIsAuth,
    setToken

} = authSlice.actions

export default authSlice.reducer

export const selectAuth = (state: RootState) => state.auth

export const initializeApp = () =>
    async (dispatch: AppDispatch) => {
        const token = getFromLocalStorage<SavedToken>(TOKEN)
        if (token && checkTokenExpired(token.date)) {
            dispatch(setToken(token.token))
            dispatch(setIsAuth())
            return true
        } else {
            dispatch(logoutThunk())
            return false
        }
    }

export const loginThunk = (loginData: LoginData) =>
    async (dispatch: AppDispatch) => {
        const response = await authApi.login(loginData)
        if (response.status === StatusCodes.CREATED_201) {
            const { token, type } = response.data
            saveToLocalStorage(TOKEN, { token, type, date: new Date() } as SavedToken)
            dispatch(setToken(response.data.token))
            dispatch(setIsAuth())
        } else if (response.status === StatusCodes.BAD_REQUEST_400) {
            return BAD_REQUEST
        } else if (response.status === StatusCodes.UNAUTHORIZED_401) {
            return NOT_AUTHORIZED
        } else {
            return SERVER_ERROR
        }
    }

export const logoutThunk = () =>
    async (dispatch: AppDispatch) => {
        deleteFromLocalStorage(TOKEN)
        dispatch(setToken(''))
        dispatch(resetIsAuth())
    }