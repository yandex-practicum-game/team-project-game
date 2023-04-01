import React, { useCallback, useState } from 'react'
import s from './PasswordEdit.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import request from 'axios'
import { ReasonResponse } from '../../api/Auth/types'
import { PATHNAMES } from '../../constants/pathnames'
import { Input } from '../../components/Input'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { UserAPI } from '../../api/User/UserAPI'

type PasswordUpdateData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const defaultPasswordData: PasswordUpdateData = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('required')
    .matches(/^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/, 'Invalid password'),
  newPassword: Yup.string()
    .required('required')
    .matches(/^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/, 'Invalid password'),
  confirmPassword: Yup.string()
    .required('required')
    .matches(/^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/, 'Invalid password'),
})

export const PasswordEditPage = () => {
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const onBack = function () {
    navigate(-1)
  }

  const updatePassword = useCallback((passwordData: PasswordUpdateData) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords are not equal')
      return
    }
    UserAPI.changeUserPassword(passwordData)
      .then(() => {
        navigate(PATHNAMES.PROFILE)
      })
      .catch(error => {
        if (request.isAxiosError(error) && error.response) {
          const data = error.response.data as ReasonResponse
          console.log('change user password error:', data.reason)
        }
      })
  }, [])

  return (
    <main className={s.passwordEdit}>
      <div className={s.passwordEdit__container}>
        <div className={s.passwordEdit__title}>Update Password</div>
        <div className={s.passwordEdit__info}>
          <Formik
            initialValues={defaultPasswordData}
            validationSchema={validationSchema}
            onSubmit={updatePassword}>
            {({ errors, handleSubmit, handleChange, values }) => {
              return (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className={s.form}
                    name="password edit form"
                    id="password-edit-form">
                    <Input
                      label="Old Password"
                      error={errors.oldPassword}
                      name={'oldPassword'}
                      placeholder={'Old Password'}
                      type={'password'}
                      value={values.oldPassword}
                      onChange={handleChange}
                    />
                    <Input
                      label="New Password"
                      error={errors.newPassword}
                      name={'newPassword'}
                      placeholder={'New Password'}
                      type={'password'}
                      value={values.newPassword}
                      onChange={handleChange}
                    />
                    <Input
                      label="Confirm Password"
                      error={errors.confirmPassword}
                      name={'confirmPassword'}
                      placeholder={'Confirm Password'}
                      type={'password'}
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                  </form>
                  {error && (
                    <span className={s.passwordEdit__error}>{error}</span>
                  )}
                </>
              )
            }}
          </Formik>
        </div>
        <div className={s.passwordEdit__actions}>
          <Button text={'Go Back'} onClick={onBack}></Button>
          <Button
            text={'Save'}
            type="submit"
            form={'password-edit-form'}></Button>
        </div>
      </div>
    </main>
  )
}
