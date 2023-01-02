import styles from './styles.module.scss'
import useSWR from 'swr'
import courseService, { FeaturedCourse } from '../../../services/courseService'
import HeaderAuth from '../../common/headerAuth';
import { Button, Container } from 'reactstrap';
import Link from 'next/link';
import SpinnerComponent from '../../common/spiner';

const FeaturedSection = () => {
    const { data, error } = useSWR('/featured', courseService.getFeatured)
    if (error) return error
    if (!data) return (<SpinnerComponent />)
    return(
        <>
            {
                (data.data instanceof Array<FeaturedCourse>) ? 
                    data.data.map((course: FeaturedCourse)=>(
                        <div key={course.id} style={{
                            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "480px"
                            }}>
                            <HeaderAuth />
                            <Container className='pt-4'>
                                <p className={styles.title}>{course.name}</p>
                                <p className={styles.description}>{course.synopsis}</p>
                                <Link href={`/courses/${course.id}`} className={styles.buttonLink}>
                                    <Button outline color='light' className={styles.button}>
                                        Acesse agora
                                        <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg}/>
                                    </Button>
                                </Link>
                            </Container>
                        </div>
                        ))[0] : 
                    <></>
            }
        </>
    )
}

export default FeaturedSection