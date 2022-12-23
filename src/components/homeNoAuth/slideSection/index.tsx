import Link from 'next/link'
import { Button, Container } from 'reactstrap'
import { CourseType } from '../../../services/courseService'
import SlideComponent from '../../common/slideComponent'
import styles from './styles.module.scss'


interface props{
    newestCourses: CourseType[]
}

const slideSection = ({newestCourses}: props) =>{
    return(
        <>
            <Container>
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