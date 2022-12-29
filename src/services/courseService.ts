import axios, { AxiosError, AxiosResponse } from "axios";
import api, { ErrorType } from "./api";


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

const courseService ={

    getNewest :async () => {
        try{
            const res = await api.get<AxiosResponse<NewestCourse[]>>(`${process.env.NEXT_PUBLIC_BASEURL_INTERNAL!}/courses/newest`)
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            console.error(err)
            return err.response!
        }
    },

    getFeatured : async () => {
        try{
            const Authorization = `Bearer ${sessionStorage.getItem("onebitflix-token")}`
            const res = await api.get<AxiosResponse<FeaturedCourse[]>>(`/courses/featured`,{headers: { Authorization }})
            return res
        } catch(err) {
            if (!axios.isAxiosError<AxiosError<ErrorType>>(err)) throw err

            console.error(err)
            return err.response!
        }
    }

}

export default courseService