import Link from 'next/link'
import { Button, Container } from 'reactstrap'
import { NewestCourse } from '../../../services/courseService'
import SlideComponent from '../../common/slideComponent'
import styles from './styles.module.scss'


interface props{
    newestCourses: NewestCourse[]
}

const slideSection = ({newestCourses}: props) =>{
    return(
        <>
            <Container className='d-flex flex-column align-items-center py-5'>
                <p className={styles.sectionTitle}>AULAS JÁ DISPONÍVEIS</p>
                <SlideComponent courses={newestCourses}></SlideComponent>
                <Link href='/register'>
                <Button outline color='light' className={styles.slideSectionBtn}>Cadastre-se para acessar</Button>
                </Link>
            </Container>
        </>
    )
}

export default slideSection