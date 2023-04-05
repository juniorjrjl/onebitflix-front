import axios, { AxiosError, AxiosResponse } from "axios";
import api, { ErrorType, Page } from "./api";

export type NewestCourse = {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
    featured: boolean
    categoryId: number
    createdAt: Date
    updatedAt: Date
};

export type FeaturedCourse ={
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
    featured: boolean
    categoryId: number
    createdAt: Date
    updatedAt: Date
}

export type PagedCourses = {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
}

export type CourseWithEpisodes = {
    id: number
    name: string
    synopsis: string
    thumbnailUrl: string
    liked: boolean,
    favorited: boolean
    episodes: EpisodeCourse[]
}

export type EpisodeCourse = {
    id: number
    name: string
    synopsis: string
    order: number
    videoUrl: string
    secondsLong: number
}

const courseService ={

    getNewestLogged :async () => {
        try{
            const res = await api.get<NewestCourse[], AxiosResponse<NewestCourse[]>>('/courses/newest')
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

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
            const res = await api.post("/favorites", {courseId}, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    addToLiked: async (courseId: number | string) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.post('/likes/', {courseId}, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    removeToLiked: async (courseId: number | string) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.delete<void, AxiosResponse<void>>(`/likes/${courseId}`, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    },

    removeFav: async (courseId: number | string) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.delete<void, AxiosResponse<void>>(`/favorites/${courseId}`, {headers: { Authorization }})
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
    },

    getWithEpisodes: async (id: number | string) =>{
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<CourseWithEpisodes, AxiosResponse<CourseWithEpisodes>>(`/courses/${id}`, {headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            return err.response!
        }
    }

}

export default courseService