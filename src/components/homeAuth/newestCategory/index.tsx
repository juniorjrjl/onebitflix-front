import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from "swr"
import courseService, { NewestCourse } from "../../../services/courseService"
import SlideComponent from "../../common/slideComponent"
import SpinnerComponent from '../../common/spiner'

const NewestCategory = () =>{
    const { data, error } = useSWR('/newest', courseService.getNewestLogged)

    if (error) return error
    if (!data) return (<SpinnerComponent />)

    return (
        (data.data instanceof Array<NewestCourse>) ? 
            <>
                <p className={styles.titleCategory}>Lançamentos</p>
                <SlideComponent courses={data.data} />
            </>: 
            <></>
    )
}

export default NewestCategory