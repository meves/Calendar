import axios from "axios";
import { setInterceptors } from "./interceptors";

export const baseURL = process.env.BASE_URL

console.log(process.env.BASE_URL);
console.log(process.env.MODE);


export const instance = setInterceptors(
    axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json"
        }
    })
)