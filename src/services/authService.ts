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

const authService = {
    register: async (params: Register) => {
        try {
            const res = await api.post<AxiosResponse<Register>>('/auth/register', params)
            return res
        } catch (err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            console.error(JSON.stringify(err))
            return err.response!
        }
    }
}

export default authService