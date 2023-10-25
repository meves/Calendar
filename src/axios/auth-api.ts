import { AxiosResponse } from 'axios';
import { LoginData, Token } from './types';
import { instance } from '.';

export const authApi = {
    
    async login(loginData: LoginData) {
        let response: AxiosResponse<Token>
        try {
            response = await instance.post<Token>(
                `user/login`, 
                loginData, 
                {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                }
            )
        } catch (error: any) {
            response = error.response
        }
        return response
    }
}