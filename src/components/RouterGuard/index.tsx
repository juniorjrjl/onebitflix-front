import { useRouter } from "next/router"
import { FC, ReactElement, ReactNode, useEffect, useState } from "react"
import SpinnerComponent from "../common/spinner"

interface props {
    children: ReactElement<any, any>
}

const RouterGuard = ({children}: props): ReactElement<any, any> =>{
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const [authorized, setAuthorized] = useState<boolean>(false)

    const authCheck = (url: string) => {
        const publicPaths = ['/login', '/'];
        const path = url.split('?')[0]
        const isAuthorized = sessionStorage.getItem("onebitflix-token") !== null
        setAuthorized(isAuthorized)
        if (!isAuthorized && !publicPaths.includes(path)){
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            })
        }
        setLoading(false)
    }

    useEffect(() =>{

        authCheck(router.asPath)
        const hideContent = () => setAuthorized(false)
        router.events.on('routeChangeStart', hideContent)
        router.events.on('routeChangeComplete', authCheck)

        return () =>{
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [])

    return loading ? <SpinnerComponent/> : children

}

export default RouterGuard