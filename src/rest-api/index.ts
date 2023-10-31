import axios from "axios";
import { setInterceptors } from "./interceptors";

export const baseURL = process.env.BASE_URL

export const instance = setInterceptors(
    axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json"
        }
    })
)