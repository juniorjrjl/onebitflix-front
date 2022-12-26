import styles from './styles.module.scss'
import { NewestCourse } from '../../../services/courseService'
import Link from 'next/link'

interface props {
    course: NewestCourse
}

const slideCard = ({course}: props) =>{
    return(
        <>
            <Link href={`/courses/${course.id}`}>
                <div className={styles.slide}>
                    <img className={styles.slideImg} src={`${process.env.NEXT_PUBLIC_BASEURL!}/${course.thumbnailUrl}`} alt={course.name} />
                    <p className={styles.slideTitle}>{course.name}</p>
                    <p className={styles.slideDescription}>{course.synopsis}</p>
                </div>
            </Link>
        </>
    )
}

export default slideCard