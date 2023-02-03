import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import { useEffect, useRef, useState } from "react";
import courseService, { CourseWithEpisodes } from "../../../src/services/courseService";
import SpinnerComponent from "../../../src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";
import episodeService from "../../../src/services/episodeService";

const EpisodePlayer = () => {
    const router = useRouter()
    const [course, setCourse] = useState<CourseWithEpisodes | any>()
    const [isReady, setIsReady] = useState(false)
    const episodeOrder = parseFloat(router.query.id?.toString() || "");
    const courseId = router.query.courseId?.toString() || "";
    const episodeId = parseFloat(router.query.episodeId?.toString() || "");

    const [getEpisodeTime, setGetEpisodeTime] = useState(0)
    const [episodeTime, setEpisodeTime] = useState(0)

    const playerRef = useRef<ReactPlayer>(null)

    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        if (!sessionStorage.getItem("onebitflix-token")){
            router.push('/login')
        }else{
            setLoading(false)
        }
    }, [])

    const handleGetEpisodeTime = async () => {
        if (episodeId){
            const res = await episodeService.getWatchTime(episodeId)

            if (res.data !== null && 'seconds' in res.data){
                setGetEpisodeTime(res.data.seconds)
            }
        }
    }

    const handlePlayerTime = () =>{
        playerRef.current?.seekTo(getEpisodeTime)
        setIsReady(true)
    }

    const handleSetEpisodeTime = async () => {
        await episodeService.setWatchTime({episodeId, seconds: Math.round(episodeTime)})
    }

    const getCourse =async () => {
        if (typeof courseId !== 'string') {
            return
        }

        const res = await courseService.getWithEpisodes(courseId)

        if (res.status === 200){
            setCourse(res.data)
        }
    }

    const handleLastEpisode = () => router.push(`/course/episode/${episodeOrder - 1}?courseId=${course.id}&episodeId=${episodeId - 1}`)

    const handleNextEpisode = () => router.push(`/course/episode/${episodeOrder + 1}?courseId=${course.id}&episodeId=${episodeId + 1}`)

    if((course) && (episodeOrder + 1 <  course.Episodes.length)){
        if (Math.round(episodeTime) === course.Episodes[episodeOrder].secondsLong){
            handleNextEpisode()
        }
    }

    if (isReady){
        setTimeout(() => { handleSetEpisodeTime() }, 1000 * 3)
    }

    useEffect(() =>{getCourse()}, [courseId])

    useEffect(() => { handleGetEpisodeTime() }, [router])

    return (
        course && !loading?
        <>
            <Head>
                <title>Onebitflix - {course.Episodes[episodeOrder].order}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric logoUrl="/home" btnContent={'Voltar para o curso' } btnUrl={`/courses/${courseId}`}/>
                <Container className="d-flex flex-column align-items-center gap-3 pt-3">
                    <p className={styles.episodeTitle}>
                        {course.Episodes[episodeOrder].name}
                    </p>
                    {typeof window === 'undefined' ? null : <><ReactPlayer className={styles.player} 
                        url={`${process.env.NEXT_PUBLIC_BASEURL!}/episodes/stream?videoUrl=${course.Episodes[episodeOrder].videoUrl}&token=${sessionStorage.getItem("onebitflix-token")}`}
                        controls 
                        ref={playerRef}
                        onStart={handlePlayerTime}
                        onProgress={(progress) => setEpisodeTime(progress.playedSeconds)}/>
                        </>
                        }
                        <div className={styles.episodeButtonDiv}>
                            <Button className={styles.episodeButton} disabled={episodeOrder === 0} onClick={handleLastEpisode}>
                                <img src="/episode/iconArrowLeft.svg" alt="setaEsquerda"  className={styles.arrowImg}/>
                            </Button>
                            <Button className={styles.episodeButton} disabled={episodeOrder + 1 === course.Episodes.length} onClick={handleNextEpisode}>
                                <img src="/episode/iconArrowRight.svg" alt="setaDireita"  className={styles.arrowImg}/>
                            </Button>
                        </div>
                        <p className="text-center py-4">
                            {course.Episodes[episodeOrder].synopsis}
                        </p>
                </Container>
            </main>
        </> :
        <>
            <SpinnerComponent />
        </>
    );
};

export default EpisodePlayer;