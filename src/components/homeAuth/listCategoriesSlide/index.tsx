import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from 'swr'
import categoriesService, { CourseFromCategory } from '../../../services/categoriesService'
import SlideComponent from '../../common/slideComponent'

interface proos {
    categoryId: number
    categoryName: string
}

const ListCategoriesSlide = ({ categoryId, categoryName}: proos) =>{
    const { data, error } = useSWR(`/categoriesCourses/${categoryId}`, () => categoriesService.getWithCourses(categoryId))

    if (error) return error
    if (!data) return (<><p>Loading...</p></>)

    return (
        ('Courses' in data.data && data.data.Courses instanceof Array<CourseFromCategory>) ?
            <>
                <p className={styles.titleCategory}>{categoryName}</p>
                <SlideComponent courses={data.data.Courses}/>
            </> :
            <></>
    )
}

export default ListCategoriesSlide