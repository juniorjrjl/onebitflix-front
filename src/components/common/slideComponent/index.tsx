import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import SlideCard from '../slideCard'

export type CouresSlide = {
    id: number
    name: string
    thumbnailUrl: string
    synopsis: string
}

interface props {
    courses: CouresSlide[]
}

const slideComponent = ({courses} : props) =>{
    let slideCount = 0;

    if (courses.length > 4){
        slideCount = 4
    }else if (courses){
        slideCount = courses.length
    }

    return(
        <>
        <div className='d-flex flex-column align-items-center py-4'>
            <Splide options={{
                type: "loop",
                perPage: slideCount,
                perMove: 1,
                width: slideCount * 300,
                pagination: false,
                arrows: courses.length > 4,
                drag: courses.length > 4,
                breakpoints:{
                    1200: {
                        perPage: slideCount >= 2 ? 2 : 1,
                        width: slideCount >= 2 ? 600 : 300,
                        arrows: courses.length > 2,
                        drag: courses.length > 2,
                    },
                    600:{
                        perPage: 1,
                        width: 300,
                        arrows: courses.length > 1,
                        drag: courses.length > 1,
                    },
                    300:{
                        width: 250
                    }
                }
            }}>
                {courses?.map(c => (
                <SplideSlide key={c.id}>
                    <SlideCard course={c}></SlideCard>
                </SplideSlide>))}
            </Splide>
        </div>
        </>
    )
}

export default slideComponent