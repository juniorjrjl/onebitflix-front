import axios, { AxiosError, AxiosResponse } from "axios";
import api, { ErrorType, Page } from "./api";


export type NewestCourse = {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
    featured: boolean
    CategoryId: number
    createdAt: Date
    updatedAt: Date
};

export type FeaturedCourse ={
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
    featured: boolean
    CategoryId: number
    createdAt: Date
    updatedAt: Date
}

export type PagedCourses = {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
}

const courseService ={

    getNewestLogged :async () => {
        try{
            const res = await api.get<NewestCourse[], AxiosResponse<NewestCourse[]>>('/courses/newest')
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            console.error(err)
            return err.response!
        }
    },

    getNewest :async () => {// used inside docker
        try{
            const res = await api.get<NewestCourse[], AxiosResponse<NewestCourse[]>>(`${process.env.NEXT_PUBLIC_BASEURL_INTERNAL!}/courses/newest`)
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    getFeatured : async () => {
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<FeaturedCourse[], AxiosResponse<FeaturedCourse[]>>(`/courses/featured`,{headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    addToFav: async (courseId: number | string) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.post("/favorites", {headers: { Authorization }, data: {courseId}})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    removeFav: async (courseId: number | string) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.delete(`/favorites/${courseId}`, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    getFavs: async () =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get('/favorites', {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    search: async (name: string) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<Page<PagedCourses>, AxiosResponse<Page<PagedCourses>>>(`/courses/search?name=${name}`, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    }

}

export default courseService