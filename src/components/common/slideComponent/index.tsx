import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { CourseType } from '../../../services/courseService'
import SlideCard from '../slideCard'


interface props {
    courses: CourseType[]
}

const slideComponent = ({courses} : props) =>{
    return(
        <>
        <div>
            <Splide options={{
                type: "loop",
                perPage: 4,
                perMove: 1,
                pagination: false
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