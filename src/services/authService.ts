import axios, { AxiosError, AxiosResponse } from "axios";
import api, { ErrorType } from "./api";

export interface Register{
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    birth: string
}

export interface Login{
    email: string
    password: string
}

export interface TokenResponse{
    type: string
    token: string
    expiresIn: number
}

const authService = {
    register: async (params: Register) => {
        try {
            const res = await api.post<any, AxiosResponse<Register>>('/auth/register', params)
            return res
        } catch (err) {
            console.log(err)
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            console.error(JSON.stringify(err))
            return err
        }
    },
    login: async (params:Login) => {
        try{
            const res = await api.post<Login, AxiosResponse<TokenResponse>>('/auth/login', params)
            if (res.status === 200) sessionStorage.setItem("onebitflix-token", res.data.token)
            return res
        } catch (err) {
            console.log(err)
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            console.error(JSON.stringify(err))
            return err
        }
    }
}

export default authService