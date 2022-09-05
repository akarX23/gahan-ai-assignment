import React, { useEffect } from 'react'

import Layout from 'hoc/Layout'
import useGlobalAuth from 'helpers/hooks/useGlobalAuth'
import { DefaultComponentProps } from 'helpers/types'
import AlertUI from 'widgets/Alert/Alert'
import { useAppSelector } from 'redux/hooks'
import { useRouter } from 'next/router'

const Wrapper = (Component: React.FC) => {
  const PageWrapper: React.FC<DefaultComponentProps> = (props) => {
    useGlobalAuth()

    const { isAuthenticated, isEmailAuthenticated, isLoading } = useAppSelector(
      (state) => state.auth
    )
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated && !isLoading && router.pathname !== '/register') {
        router.push('/login')
      }

      if (isAuthenticated && !isEmailAuthenticated) {
        router.push('/verify-email')
      }
    }, [isAuthenticated, isLoading])

    // MUTING REF ERRORS
    const originalError = console.error

    console.error = (...args) => {
      if (/Warning.*Function components cannot be given refs/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }

    return (
      <Layout>
        <>
          <Component {...props} />
          <AlertUI />
        </>
      </Layout>
    )
  }

  return PageWrapper
}

export default Wrapper
