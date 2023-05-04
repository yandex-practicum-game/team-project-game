import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../store/base.api'
import { PATHNAMES } from '../constants/pathnames'
import { API_CONFIG } from '../constants/apiConfig'
import { useOAuthSignInMutation } from '../store/oauth.api'

export const withAuth = (WrappedComponent: React.ComponentType<unknown>) => {
  return (props: Record<string, unknown>) => {
    const navigate = useNavigate()
    const { data: userData, isFetching, isError } = useGetUserQuery(null)
    const [oAuthSignIn] = useOAuthSignInMutation()

    useEffect(() => {
      ;(async () => {
        const code = new URLSearchParams(window.location.search).get('code')

        if (!code) {
          return
        }

        await oAuthSignIn({ code, redirect_uri: API_CONFIG.REDIRECT_URI })
        window.history.pushState(
          { path: API_CONFIG.REDIRECT_URI },
          '',
          API_CONFIG.REDIRECT_URI
        )
      })()
    }, [])

    useEffect(() => {
      if ((!userData && !isFetching) || isError) {
        navigate(PATHNAMES.LOGIN)
      }
    }, [userData, isFetching, isError])

    return <WrappedComponent {...props} />
  }
}
