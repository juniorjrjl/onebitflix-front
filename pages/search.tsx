import styles from '../styles/search.module.scss'
import Head from 'next/head'
import HeaderAuth from '../src/components/common/headerAuth'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Page } from '../src/services/api';
import courseService, { PagedCourses } from '../src/services/courseService';
import { Container } from 'reactstrap';
import SearchCard from '../src/components/searchCard';
import Footer from '../src/components/common/footer';
import SpinnerComponent from '../src/components/common/spinner';

const Search = () =>{
    const router = useRouter();
    const searchName = router.query.name;
    const [searchResult, setSearchResult] = useState<Page<PagedCourses> | any>()
    const searchCourses =async () => {
        if (typeof searchName === "string"){
            const res = await courseService.search(searchName)
            setSearchResult(res?.data)
        }
    }

    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        if (!sessionStorage.getItem("onebitflix-token")){
            router.push('/login')
        }else{
            setLoading(false)
        }
    }, [])

    useEffect(() => {searchCourses()}, [searchName])
    return(
        loading ?
        <>
            <SpinnerComponent />
        </> :
        <>
            <Head>
                <title>Onebitflix - {searchName}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.headerFooterBG}>
                    <HeaderAuth />
                </div>
                <div className={styles.searchResult}>
                    <Container className='d-flex flex-wrap justify-content-center gap-5 py-4'>
                        {searchResult?.content.length >= 1 ? 
                            searchResult?.content?.map((course: PagedCourses) =>(
                                    <SearchCard key={course.id} course={course}/>
                            )) :
                            <p className={styles.noSearchResult}>Nenhum resultado encontrado</p>
                        }
                    </Container>
                </div>
                <div className={styles.headerFooterBG}>
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default Search