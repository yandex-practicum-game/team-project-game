import React, { useCallback, useEffect, useMemo, useState } from 'react'
import s from './ProfilePage.module.scss'
import { useNavigate } from 'react-router-dom'
import { InfoRow } from '../../components/InfoRow'
import { Button } from '../../components/Button'
import { AuthAPI } from '../../api/Auth/AuthAPI'
import request from 'axios'
import { ReasonResponse, UserResponse } from '../../api/Auth/types'
import { PATHNAMES } from '../../constants/pathnames'
import { Avatar } from '../../components/Avatar'
import { API_CONFIG } from '../../api/config'
import { Spinner } from '../../components/Spinner'

const defaultUserData: UserResponse = {
  id: 0,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: '',
}

export const ProfilePage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(defaultUserData)
  const avatarPath = useMemo(
    () => API_CONFIG.RESOURCES_URL + user.avatar,
    [user.avatar]
  )

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await AuthAPI.getUser()
        const user = response.data
        setUser(user)
      } catch (error) {
        if (request.isAxiosError(error) && error.response) {
          const data = error.response.data as ReasonResponse
          console.log('get user error:', data.reason)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  const onLogout = useCallback(async () => {
    try {
      await AuthAPI.logout()
      navigate(PATHNAMES.LOGIN)
    } catch (error) {
      if (request.isAxiosError(error) && error.response) {
        const data = error.response.data as ReasonResponse
        console.log('get user error:', data.reason)
      }
    }
  }, [])

  return (
    <main className={s.profilePage}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={s.profilePage__container}>
          <div className={s.profilePage__title}>Profile</div>
          <div className={s.profilePage__info}>
            <div className={s.profilePage__content_left}>
              <Avatar path={user.avatar ? avatarPath : ''} isEditable={false} />
              <div className={s.profilePage__displayName}>
                {user.display_name ?? user.login}
              </div>
            </div>
            <div className={s.profilePage__content_right}>
              <InfoRow name={'Email'} value={user.email}></InfoRow>
              <InfoRow name={'Login'} value={user.login}></InfoRow>
              <InfoRow name={'First Name'} value={user.first_name}></InfoRow>
              <InfoRow name={'Second Name'} value={user.second_name}></InfoRow>
              <InfoRow name={'Phone'} value={user.phone}></InfoRow>
            </div>
          </div>
          <div className={s.profilePage__actions}>
            <Button
              text={'Edit Profile'}
              path={PATHNAMES.PROFILE_EDIT}></Button>
            <Button
              text={'Change Password'}
              path={PATHNAMES.PASSWORD_EDIT}></Button>
            <Button text={'Logout'} onClick={onLogout}></Button>
          </div>
        </div>
      )}
    </main>
  )
}
