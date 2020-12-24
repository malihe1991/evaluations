import SignInForm from '../../../components/auth/sign-in-form'
import { useEffect } from 'react'
import useAuth from '../../../components/contexts/auth';

const SignOut = () => {
   const { logout }: any = useAuth();

   useEffect(() => {
    logout()
   }, [])

   return null

}

export default SignOut