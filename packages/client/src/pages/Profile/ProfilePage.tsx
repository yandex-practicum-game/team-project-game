import React, { useCallback, useMemo } from 'react'
import s from './ProfilePage.module.scss'
import { useNavigate } from 'react-router-dom'
import { InfoRow } from '../../components/InfoRow'
import { Button } from '../../components/Button'
import { PATHNAMES } from '../../constants/pathnames'
import { Avatar } from '../../components/Avatar'
import { API_CONFIG } from '../../api/config'
import { Spinner } from '../../components/Spinner'
import { useGetUserQuery, useLogoutMutation } from '../../store/auth/auth.api'
import { useAlert } from 'react-alert'
import { ERROR_TEXT, OK_STATUS } from '../../constants/requests'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const { data: user, isLoading } = useGetUserQuery(null)
  const [logout] = useLogoutMutation()
  const avatarPath = useMemo(
    () => API_CONFIG.RESOURCES_URL + user?.avatar,
    [user?.avatar]
  )
  const alert = useAlert()

  const onLogout = useCallback(async () => {
    const result = await logout(null).unwrap()
    if (result === OK_STATUS) {
      navigate(PATHNAMES.LOGIN)
    } else {
      alert.show(ERROR_TEXT)
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
              <Avatar path={user?.avatar ? avatarPath : ''} />
              <div className={s.profilePage__displayName}>
                {user?.display_name ?? user?.login}
              </div>
            </div>
            <div className={s.profilePage__content_right}>
              <InfoRow name={'Email'} value={user?.email} />
              <InfoRow name={'Login'} value={user?.login} />
              <InfoRow name={'First Name'} value={user?.first_name} />
              <InfoRow name={'Second Name'} value={user?.second_name} />
              <InfoRow name={'Phone'} value={user?.phone} />
            </div>
          </div>
          <div className={s.profilePage__actions}>
            <Button text={'Edit Profile'} path={PATHNAMES.PROFILE_EDIT} />
            <Button text={'Change Password'} path={PATHNAMES.PASSWORD_EDIT} />
            <Button text={'Logout'} onClick={onLogout} />
          </div>
        </div>
      )}
    </main>
  )
}
