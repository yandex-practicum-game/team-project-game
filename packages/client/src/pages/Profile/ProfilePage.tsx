import s from './ProfilePage.module.scss'

import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { InfoRow } from '../../components/InfoRow'
import { Button } from '../../components/Button'
import { PATHNAMES } from '../../constants/pathnames'
import { Avatar } from '../../components/Avatar'
import { Spinner } from '../../components/Spinner'
import { useGetUserQuery, useLogoutMutation } from '../../store/base.api'
import { useAlert } from 'react-alert'
import { TEXTS } from '../../constants/requests'
import { RESOURCES_URL } from '../../constants/apiConfig'
import { withAuth } from '../../hocs/withAuth'
import { Layout } from '../../components/Layout'

const ProfilePage = () => {
  const { data: user, isLoading } = useGetUserQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const navigate = useNavigate()
  const alert = useAlert()

  const [logout] = useLogoutMutation()

  const avatarPath = useMemo(() => RESOURCES_URL + user?.avatar, [user?.avatar])

  const onLogout = useCallback(async () => {
    try {
      await logout(null).unwrap()
      navigate(PATHNAMES.LOGIN)
    } catch {
      alert.show(TEXTS.ERROR)
    }
  }, [])

  return (
    <Layout>
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
    </Layout>
  )
}

export default withAuth(ProfilePage)
