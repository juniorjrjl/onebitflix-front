import styles from './styles.module.scss'

import Link from 'next/link'
import { Couresslide } from '../slideComponent'

interface props {
    course: Couresslide
}

const slideCard = ({course}: props) =>{
    return(
        <>
            <Link href={`/courses/${course.id}`} className={styles.slideLink}>
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