import styles from "../../styles/coursesPage.module.scss"
import Head from "next/head"
import HeaderAuth from "../../src/components/common/headerAuth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import courseService, { CourseWithEpisodes, EpisodeCourse } from "../../src/services/courseService"
import { Button, Container } from "reactstrap"
import SpinnerComponent from "../../src/components/common/spinner"
import EpisodeList from "../../src/components/episodeList"
import Footer from "../../src/components/common/footer"

const CoursePage = () => {
    const [course, setCourse] = useState<CourseWithEpisodes | any>()
    const router = useRouter();
    const { id } = router.query
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        if (!sessionStorage.getItem("onebitflix-token")){
            router.push('/login')
        }else{
            setLoading(false)
        }
    }, [])

    const getCourse = async () => {
        if (typeof id !== "string") return

        const res = await courseService.getWithEpisodes(id)

        if (res.status === 200){
            setCourse(res.data)
            if ('liked' in res.data) setLiked(res.data.liked)
            if ('favorited' in res.data) setFavorited(res.data.favorited)
        }
    }

    const handleLikeCourse = async () =>{
        if (typeof id !== "string") return
        if(liked){
            await courseService.removeToLiked(id)
            setLiked(false)
        } else {
            await courseService.addToLiked(id)
            setLiked(true)
        }
    }

    const handleFavCourse = async () =>{
        if (typeof id !== "string") return
        if(favorited){
            await courseService.removeFav(id)
            setFavorited(false)
        } else {
            await courseService.addToFav(id)
            setFavorited(true)
        }
    }

    const getEpisodesLenghtText = () => {
        if (!course.Episodes) return ''
        return `${course.Episodes.length} episódio${course.Episodes.length !== 1 ? 's' : ''}`
    }

    useEffect(() => { getCourse() } , [id])

    return(
        
            course && !loading ? 
            <>
            <Head>
                <title>Onebitflix - {"nomeDoCurso"}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <div style={{
                        backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: '450px'
                    }}>
                    <HeaderAuth />
                </div>
                <Container className={styles.courseInfo}>
                    <p className={styles.courseTitle}>{course?.name}</p>
                    <p className={styles.courseDescription}>{course?.synopsis}</p>
                    <Button outline className={styles.courseBtn} disabled={course.Episodes.length === 0}>
                        Assistir Agora
                        <img src="/buttonPlay.svg" alt="buttomImg" className={styles.buttonImg}/>
                    </Button>
                    <div className={styles.interactions}>
                        <img src={`/course/${liked ? 'iconLiked' : 'iconLike'}.svg`} alt="likeImage" className={styles.interactionImage} onClick={handleLikeCourse}/>
                        <img src={`/course/${favorited ? 'iconFavorited' : 'iconAddFav'}.svg`} alt="favoriteImage" className={styles.interactionImage} onClick={handleFavCourse}/>
                    </div>
                </Container>
                <Container className={styles.episodeInfo}>
                    <p className={styles.episodeDivision}>Episódios</p>
                    <p className={styles.episodeLenght}>{getEpisodesLenghtText()}</p>
                    {course.Episodes.length === 0 ? 
                        <p>
                            <strong>Não temos episódios nesse curso ainda, aguarde</strong>
                        </p>: 
                        course.Episodes?.map((episode: EpisodeCourse) => <EpisodeList key={episode.id} episode={episode} course={course}/>)}
                </Container>
                <Footer />
            </main>
        </>:
        <>
            <SpinnerComponent />
        </> 
    )
}

export default CoursePage