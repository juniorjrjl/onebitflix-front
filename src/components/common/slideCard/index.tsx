import styles from './styles.module.scss'
import { CourseType } from '../../../services/courseService'

interface props {
    course: CourseType
}

const slideCard = ({course}: props) =>{
    return(
        <>
            <div className={styles.slide}>
                <img className={styles.slideImg} src={`${process.env.NEXT_PUBLIC_BASEURL!}/${course.thumbnailUrl}`} alt={course.name} />
                <p className={styles.slideTitle}>{course.name}</p>
                <p className={styles.slideDescription}>{course.synopsis}</p>
            </div>
        </>
    )
}

export default slideCard