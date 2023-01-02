import styles from '../../../../styles/slideCategory.module.scss'
import useSWR from "swr"
import courseService from '../../../services/courseService'
import SlideComponent from '../../common/slideComponent'
import SpinnerComponent from '../../common/spinner'

const FavoriteCategory = () =>{
    const { data, error } = useSWR('/favorites', courseService.getFavs)

    if (error) return error
    if (!data) return (<SpinnerComponent />)
    return(
        <>
            <p className={styles.titleCategory}>Minha lista</p>
            {data.data.courses.lenght >= 1 ? 
                (<SlideComponent courses={data.data.courses} />) : 
                (<p className='text-center pt-3 h5'>
                    <strong>Você não tem nenhum curso na lista</strong>
                </p>)}
        </>
    )
}

export default FavoriteCategory