import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import s from './ProfileEditPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { UserResponse } from '../../api/Auth/types'
import { Avatar } from '../../components/Avatar'
import { API_CONFIG } from '../../api/config'
import * as Yup from 'yup'
import { Input } from '../../components/Input'
import { Formik } from 'formik'
import { Spinner } from '../../components/Spinner'
import { PATHNAMES } from '../../constants/pathnames'
import { OverlayBlur } from '../../components/OverlayBlur'
import { Modal } from '../../components/Modal'
import { useGetUserQuery } from '../../store/auth/auth.api'
import {
  useChangeUserAvatarMutation,
  useChangeUserDataMutation,
} from '../../store/user/user.api'

/* eslint-disable */
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('required')
    .matches(/[a-zA-Z\d-]+@+[a-zA-Z\d-]+\.+[a-zA-Z\d-]*/, 'Invalid email'),
  login: Yup.string()
    .required('required')
    .matches(/^[^\d][^\s][a-zA-Z\d_-]{1,18}$/, 'Invalid login'),
  display_name: Yup.string().matches(
    /^[^\d][^\s][a-zA-Z\d_-]{1,18}$/,
    'Invalid display name'
  ),
  first_name: Yup.string()
    .required('required')
    .matches(/^[A-ZА-ЯЁ][^\d^\s][a-zа-яё-]*/, 'Invalid first name'),
  second_name: Yup.string()
    .required('required')
    .matches(/^[A-ZА-ЯЁ][^\d^\s][a-zа-яё-]*/, 'Invalid second name'),
  phone: Yup.string()
    .required('required')
    .matches(/^[\+]?[0-9]{10,15}$/, 'Invalid phone'),
})

export const ProfileEditPage = () => {
  const [error] = useState('')
  const {
    data: user,
    isLoading,
    refetch: refetchGetUser,
  } = useGetUserQuery(null)
  const [changeUserData] = useChangeUserDataMutation()
  const [changeUserAvatar] = useChangeUserAvatarMutation()
  const [title, setTitle] = useState('Upload file')
  const [showDescription, setShowDescription] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalError, setModalError] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined)

  const popupElemRef = useRef<HTMLInputElement>(null)
  const inputElemRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const avatarPath = useMemo(
    () => API_CONFIG.RESOURCES_URL + user?.avatar,
    [user?.avatar]
  )

  const onBack = function () {
    navigate(-1)
  }

  const updateProfile = useCallback(
    async (userData: Omit<UserResponse, 'id' | 'avatar'>) => {
      try {
        await changeUserData(userData)
        navigate(PATHNAMES.PROFILE)
      } catch (error) {
        console.log('get user error:', error)
      }
    },
    []
  )

  const handleAvatarClick = useCallback(() => {
    setModalError(false)
    setIsModalVisible(true)
  }, [])

  const handleAvatarClose = useCallback(() => {
    setIsModalVisible(false)
    setShowDescription(false)
    setTitle('Upload file')
    setFile(undefined)
  }, [])

  useEffect(() => {
    inputElemRef.current?.addEventListener('change', event => {
      const target = event.currentTarget as HTMLInputElement
      const file: File | null = (target.files as FileList)[0]
      if (file) {
        setTitle('File is loaded')
        setShowDescription(false)
        setFile(file)
      }
    })
  }, [isModalVisible])

  const handleOverlayClick = useCallback((event: BaseSyntheticEvent) => {
    const contains =
      popupElemRef.current === event.target ||
      popupElemRef.current?.contains(event.target)
    if (!contains) {
      setIsModalVisible(false)
      setShowDescription(false)
      setTitle('Upload file')
      setFile(undefined)
    }
  }, [])

  const handleModalSubmit = useCallback(async () => {
    if (!file) {
      setShowDescription(true)
    } else {
      const formData = new FormData()
      formData.append('avatar', file)
      try {
        const result = await changeUserAvatar(formData)
        if ('data' in result && result.data) {
          refetchGetUser()
          handleAvatarClose()
        } else {
          setModalError(true)
        }
      } catch (error) {
        setModalError(true)
      }
    }
  }, [file, handleAvatarClose])

  return (
    <main className={s.profilePageEdit}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={s.profilePageEdit__container}>
          <div className={s.profilePageEdit__title}>Edit Profile</div>
          <div className={s.profilePageEdit__info}>
            <div className={s.profilePageEdit__content_left}>
              <Avatar
                path={user?.avatar ? avatarPath : ''}
                onClick={handleAvatarClick}
                isEditable={true}
              />
              <div className={s.profilePageEdit__displayName}>
                {user?.display_name ?? user?.login}
              </div>
            </div>
            <div className={s.profilePageEdit__content_right}>
              <Formik
                initialValues={user}
                validationSchema={validationSchema}
                onSubmit={updateProfile}>
                {({ errors, handleSubmit, handleChange, values }) => {
                  return (
                    <>
                      <form
                        onSubmit={handleSubmit}
                        className={s.form}
                        name="profile edit form"
                        id="profile-edit-form">
                        <Input
                          label="Email"
                          error={errors.email}
                          name={'email'}
                          placeholder={'Email Address'}
                          type={'email'}
                          value={values.email}
                          onChange={handleChange}
                        />
                        <Input
                          label="Login"
                          error={errors.login}
                          name={'login'}
                          placeholder={'Login'}
                          type={'text'}
                          value={values.login}
                          onChange={handleChange}
                        />
                        <Input
                          label="Display name"
                          error={errors.display_name}
                          name={'display_name'}
                          placeholder={'Display name'}
                          type={'text'}
                          value={values.display_name ?? ''}
                          onChange={handleChange}
                        />
                        <Input
                          label="Phone number"
                          error={errors.phone}
                          name={'phone'}
                          placeholder={'Phone number'}
                          type={'number'}
                          value={values.phone}
                          onChange={handleChange}
                        />
                        <Input
                          label="Name"
                          error={errors.first_name}
                          name={'first_name'}
                          placeholder={'Name'}
                          type={'text'}
                          value={values.first_name}
                          onChange={handleChange}
                        />
                        <Input
                          label="Surname"
                          error={errors.second_name}
                          name={'second_name'}
                          placeholder={'Surname'}
                          type={'text'}
                          value={values.second_name}
                          onChange={handleChange}
                        />
                      </form>
                      {error && <span className={s.regError}>{error}</span>}
                    </>
                  )
                }}
              </Formik>
            </div>
          </div>
          <div className={s.profilePageEdit__actions}>
            <Button text={'Go Back'} type="button" onClick={onBack}></Button>
            <Button
              text={'Save'}
              type="submit"
              form={'profile-edit-form'}></Button>
          </div>
        </div>
      )}
      {isModalVisible && (
        <OverlayBlur onClick={handleOverlayClick}>
          <Modal
            ref={popupElemRef}
            onClick={handleModalSubmit}
            title={title}
            buttonText="Update Avatar"
            showDescription={showDescription}
            descriptionText="Choose file">
            <label className={s.profilePageEdit__inputFile}>
              <input ref={inputElemRef} type="file" />
            </label>
            {modalError && (
              <p className={s.profilePageEdit__errorMessage}>
                Couldn't save avatar!
              </p>
            )}
          </Modal>
        </OverlayBlur>
      )}
    </main>
  )
}
