import axios, { AxiosError, AxiosResponse } from "axios";
import api, { ErrorType, Page } from "./api";

export type CategoryOnDemmand = {
    id: number
    name: string
    position: number
}

export type CategoryWithCourses ={
    id: number
    name: string
    Courses?: CourseFromCategory[] 
}

export type CourseFromCategory = {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
}

const categoriesService = {

    getOnDemmand: async () =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<Page<CategoryOnDemmand>, AxiosResponse<Page<CategoryOnDemmand>>>("/categories", {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    getWithCourses: async (id: number) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<AxiosResponse<CategoryWithCourses>>(`/categories/${id}`, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    }

}

export default categoriesService