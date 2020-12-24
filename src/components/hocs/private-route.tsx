import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuth from '../contexts/auth'

const PrivateRoute = (Component: any) => {

    return () => {

        const { user, isAuth, loading }: any = useAuth();
        const router = useRouter()

        useEffect(() => {
            if (!isAuth && !loading) router.replace('/auth/sign-in')
        }, [loading, isAuth])

        return isAuth && (<Component />)
    }
}

export default PrivateRoute