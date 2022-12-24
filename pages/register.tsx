import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import HeaderGeneric from '../src/components/common/headerGeneric'

const register = () =>{
    return(
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero fazer login'></HeaderGeneric>
            </main>
        </>
    )
}

export default register