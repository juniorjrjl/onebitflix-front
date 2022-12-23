import { AxiosResponse } from "axios";
import api from "./api";

export type EpisodeType ={
    id: number
    name: string
    synopsis: string
    order: number
    videoUrl: string
    secondsLong: number
}

export type CourseType = {
    id: number
    name: string
    thumbnailUrl: string
    synopsis: string
    episodes?: EpisodeType[]
};

const courseService ={

    getNewest :async () => {
        try{
            const res = await api.get('/courses/newest')
            return res
        }catch(err){
            console.log(err.response.status)
            return err.response
        }

    }

}

export default courseService