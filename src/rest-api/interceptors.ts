import { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { getFromLocalStorage } from "../store/local-storage/utils"
import { SavedToken } from "./types"
import { TOKEN } from "../store/local-storage/constants"

const onRequest = (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
    const token = getFromLocalStorage<SavedToken>(TOKEN)
    if (token) {
        config.headers && (config.headers["Authorization"] = `${token.type} ${token.token}`)
    }
    return config
}

export const setInterceptors = (instance: AxiosInstance): AxiosInstance => {
    instance.interceptors.request.use(onRequest)
    return instance
}