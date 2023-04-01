import React, {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import s from './ProfileEditPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { AuthAPI } from '../../api/Auth/AuthAPI'
import request from 'axios'
import { ReasonResponse, UserResponse } from '../../api/Auth/types'
import { Avatar } from '../../components/Avatar'
import { API_CONFIG } from '../../api/config'
import * as Yup from 'yup'
import { Input } from '../../components/Input'
import { Formik } from 'formik'
import { Spinner } from '../../components/Spinner'
import { UserAPI } from '../../api/User/UserAPI'
import { PATHNAMES } from '../../constants/pathnames'
import { OverlayBlur } from '../../components/OverlayBlur'
import { Modal } from '../../components/Modal'

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
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(defaultUserData)
  const [title, setTitle] = useState('Upload file')
  const [showDescription, setShowDescription] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalError, setModalError] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined)

  const popupElemRef = useRef<HTMLInputElement>(null)
  const inputElemRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const onBack = function () {
    navigate(-1)
  }

  useEffect(() => {
    AuthAPI.getUser()
      .then(response => {
        const user = response.data
        setUser(user)
      })
      .catch(error => {
        if (request.isAxiosError(error) && error.response) {
          const data = error.response.data as ReasonResponse
          console.log('get user error:', data.reason)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  const avatarPath = API_CONFIG.RESOURCES_URL + user.avatar

  const updateProfile = useCallback(
    (userData: Omit<UserResponse, 'id' | 'avatar'>) => {
      UserAPI.changeUserData(userData)
        .then(() => {
          navigate(PATHNAMES.PROFILE)
        })
        .catch(error => {
          if (request.isAxiosError(error) && error.response) {
            const data = error.response.data as ReasonResponse
            console.log('get user error:', data.reason)
          }
        })
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
      const file: File | null = (
        (event.currentTarget as HTMLInputElement).files as FileList
      )[0]
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

  const handleModalSubmit = useCallback(() => {
    if (!file) {
      setShowDescription(true)
    } else {
      const formData = new FormData()
      console.log(file)
      formData.append('avatar', file)
      UserAPI.changeUserAvatar(formData)
        .then(response => {
          const user = response.data
          if (user) {
            setUser(user)
            handleAvatarClose()
          } else {
            setModalError(true)
          }
        })
        .catch(error => {
          if (request.isAxiosError(error) && error.response) {
            const data = error.response.data as ReasonResponse
            console.log('change user avatar error:', data.reason)
            setModalError(true)
          }
        })
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
                path={user.avatar ? avatarPath : ''}
                onClick={handleAvatarClick}
                isEditable={true}
              />
              <div className={s.profilePageEdit__displayName}>
                {user.display_name ?? user.login}
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
