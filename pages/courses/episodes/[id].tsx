import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderGeneric from "../../../src/components/common/headerGeneric";
import { useEffect, useState } from "react";
import courseService, { CourseWithEpisodes } from "../../../src/services/courseService";
import SpinnerComponent from "../../../src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

const EpisodePlayer = () => {
    const router = useRouter()
    const [course, setCourse] = useState<CourseWithEpisodes | any>()
    const episodeOrder = parseFloat(router.query.id?.toString() || "");
    const courseId = router.query.courseId?.toString() || "";

    const getCourse =async () => {
        if (typeof courseId !== 'string' && courseId !== '') return

        const res = await courseService.getWithEpisodes(courseId)

        if (res.status === 200){
            setCourse(res.data)
        }
    }

    const handleLastEpisode = () => router.push(`/course/episode/${episodeOrder - 1}?courseId=${course.id}`)

    const handleNextEpisode = () => router.push(`/course/episode/${episodeOrder + 1}?courseId=${course.id}`)

    useEffect(() =>{getCourse()}, [courseId])

    return (
        course ?
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
                    {typeof window === 'undefined' ? null : <ReactPlayer className={styles.player} 
                        url={`${process.env.NEXT_PUBLIC_BASEURL!}/episodes/stream?videoUrl=${course.Episodes[episodeOrder].videoUrl}&token=${sessionStorage.getItem("onebitflix-token")}`}  controls />}
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