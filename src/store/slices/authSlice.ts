import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../redux-store"
import { deleteFromLocalStorage, getFromLocalStorage, saveToLocalStorage } from "../local-storage/utils"
import { TOKEN } from "../local-storage/constants"
import { LoginData, Token } from "../../axios/types" 
import { authApi } from "../../axios/auth-api"
import { StatusCodes } from "../../axios/status-codes"
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
        const token = getFromLocalStorage<Token>(TOKEN)
        if (token) {
            dispatch(setToken(token.token))
            dispatch(setIsAuth())            
            return true
        } else {
            return false
        }
    }

export const loginThunk = (loginData: LoginData) =>
    async (dispatch: AppDispatch) => {
        const response = await authApi.login(loginData)
        if (response.status === StatusCodes.CREATED_201) {
            saveToLocalStorage(TOKEN, response.data)
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