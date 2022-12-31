import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL!

const api = axios.create({baseURL})


export type ErrorType ={
    message: string
}

export type Page<T> = {
    page: number
    perPage: number
    total: number
    content: Array<T>
}

export default api;