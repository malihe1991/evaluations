import Head from 'next/head'
import router from 'next/router';
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    router.replace('/auth/sign-in')
  }, [])

  return null
}
