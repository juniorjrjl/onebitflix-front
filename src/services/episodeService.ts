import axios, { AxiosError, AxiosResponse } from "axios";
import api, { ErrorType } from "./api";

export type WatchTimeParams = {
    episodeId: number
    seconds: number
}

const episodeService = {

    getWatchTime :  async (id: number) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<WatchTimeParams, AxiosResponse<WatchTimeParams>>(`/episodes/${id}/watchTime`, {headers: { Authorization }})
            
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    setWatchTime :  async ({episodeId, seconds} : WatchTimeParams) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.post<WatchTimeParams, AxiosResponse<WatchTimeParams>>(`/episodes/${episodeId}/watchTime`, {headers: { Authorization }})
            
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    }

}

export default episodeService