import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../store/base.api'
import { PATHNAMES } from '../constants/pathnames'

export type WithAuthProps = {
  user: any
  isLoading: boolean
}

export const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const navigate = useNavigate()
    const { data: userData, isLoading, isSuccess } = useGetUserQuery(null)

    useEffect(() => {
      if (!userData && !isLoading) {
        navigate(PATHNAMES.LOGIN)
      }
    }, [userData, isLoading, isSuccess])

    return <WrappedComponent {...props} user={userData} isLoading={isLoading} />
  }
}
