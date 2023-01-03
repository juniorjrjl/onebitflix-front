import styles from '../styles/search.module.scss'
import Head from 'next/head'
import HeaderAuth from '../src/components/common/headerAuth'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Page } from '../src/services/api';
import courseService, { PagedCourses } from '../src/services/courseService';

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
    useEffect(() => {searchCourses()}, [searchName])
    return(<>
        <Head>
            <title>Onebitflix - {searchName}</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon"/>
        </Head>
        <main>
            <HeaderAuth />
            {searchResult?.content?.map((course: PagedCourses) =>(
                <div key={course.id}>
                    <p>{course.name}</p>
                </div>
            ))}
        </main>
    </>)
}

export default Search