import axios, { AxiosError, AxiosResponse } from "axios";
import api, { ErrorType } from "./api";

export interface CurrentUser {
    firstName: string
    lastName: string
    phone: string
    email: string
    created_at: string
}

const profileService = {

    fetchCurrent:  async () =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<CurrentUser, AxiosResponse<CurrentUser>>("/users/current", {headers: { Authorization }})
            console.log(res)
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    update:  async (params: CurrentUser) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.put<CurrentUser, AxiosResponse<CurrentUser>>("/users/current", params, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    }

}

export default profileService