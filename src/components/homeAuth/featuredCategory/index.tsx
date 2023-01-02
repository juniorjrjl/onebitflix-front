import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from "swr"
import courseService, { FeaturedCourse } from '../../../services/courseService'
import SlideComponent from '../../common/slideComponent'
import SpinnerComponent from '../../common/spinner'

const FeaturedCategory = () =>{
    const { data, error } = useSWR('/featured', courseService.getFeatured)

    if (error) return error
    if (!data) return (<SpinnerComponent />)
    return (
        (data.data instanceof Array<FeaturedCourse>) ? 
            <>
                <p className={styles.titleCategory}>Em destaque</p>
                <SlideComponent courses={data.data}/>
            </> :
            <></>
    )
}

export default FeaturedCategory