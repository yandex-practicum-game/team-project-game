import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../store/base.api'
import { PATHNAMES } from '../constants/pathnames'

export const withAuth = (WrappedComponent: React.ComponentType<unknown>) => {
  return (props: Record<string, unknown>) => {
    const navigate = useNavigate()
    const { data: userData, isFetching, isError } = useGetUserQuery(null)

    useEffect(() => {
      if ((!userData && !isFetching) || isError) {
        navigate(PATHNAMES.LOGIN)
      }
    }, [userData, isFetching, isError])

    return <WrappedComponent {...props} />
  }
}
