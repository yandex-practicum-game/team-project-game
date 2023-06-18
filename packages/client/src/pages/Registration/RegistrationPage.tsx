import React, { useCallback, useEffect, useState } from 'react'

import { Formik } from 'formik'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import s from './RegistrationPage.module.scss'
import * as Yup from 'yup'
import { Layout } from '../../components/Layout'
import { TEXTS } from '../../constants/requests'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery, useSignUpMutation } from '../../store/base.api'
import { SingupRequest } from '../../types/auth.types'
import { PATHNAMES } from '../../constants/pathnames'
import { Spinner } from '../../components/Spinner'

const userData: SingupRequest = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  confirm_password: '',
}

/* eslint-disable */
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('required')
    .matches(/[a-zA-Z\d-]+@+[a-zA-Z\d-]+\.+[a-zA-Z\d-]*/, 'Invalid email'),
  login: Yup.string()
    .required('required')
    .matches(/^[^\d][^\s][a-zA-Z\d_-]{1,18}$/, 'Invalid login'),
  first_name: Yup.string()
    .required('required')
    .matches(/^[A-ZА-ЯЁ][^\d^\s][a-zа-яё-]*/, 'Invalid first name'),
  second_name: Yup.string()
    .required('required')
    .matches(/^[A-ZА-ЯЁ][^\d^\s][a-zа-яё-]*/, 'Invalid second name'),
  phone: Yup.string()
    .required('required')
    .matches(/^[0-9]{10,15}$/, 'Invalid phone'),
  password: Yup.string()
    .required('required')
    .matches(/^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/, 'Invalid password'),
  confirm_password: Yup.string()
    .required('required')
    .matches(/^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/, 'Invalid password'),
})

export const RegistrationPage = () => {
  const navigate = useNavigate()
  const { data: user, isLoading: isLoadGetUser } = useGetUserQuery({})
  const [signUp, { isLoading: isLoadCreateUser }] = useSignUpMutation()
  const [error, setError] = useState('')

  const createAccount = useCallback(async (userData: SingupRequest) => {
    setError('')
    if (userData.password !== userData.confirm_password) {
      setError('password not match')
      return
    }
    try {
      await signUp(userData).unwrap()
      navigate(PATHNAMES.HOME)
    } catch (err: any) {
      setError(err.data?.reason || TEXTS.ERROR)
    }
  }, [])

  useEffect(() => {
    if (user) {
      navigate(PATHNAMES.HOME)
    }
  }, [user])

  const isLoading = isLoadGetUser || isLoadCreateUser

  return (
    <Layout>
      <main className={s.registrationPage}>
        <div className={s.registrationForm}>
          <h1 className={s.title}>Create account</h1>
          <Formik
            initialValues={userData}
            validationSchema={validationSchema}
            onSubmit={createAccount}>
            {({ errors, handleSubmit, handleChange, values }) => {
              return (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className={s.form}
                    name="registration form"
                    id="reg-form">
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
                      label="Nickname"
                      error={errors.login}
                      name={'login'}
                      placeholder={'Nickname'}
                      type={'text'}
                      value={values.login}
                      onChange={handleChange}
                    />
                    <Input
                      label="Phone number"
                      error={errors.phone}
                      name={'phone'}
                      placeholder={'Phone number'}
                      type={'text'}
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
                    <Input
                      label="Password"
                      error={errors.password}
                      name={'password'}
                      placeholder={'Password'}
                      type={'password'}
                      value={values.password}
                      onChange={handleChange}
                    />
                    <Input
                      label="Confirm Password"
                      error={errors.confirm_password}
                      name={'confirm_password'}
                      placeholder={'Confirm Password'}
                      type={'password'}
                      value={values.confirm_password}
                      onChange={handleChange}
                    />
                  </form>
                  {error && <span className={s.regError}>{error}</span>}
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Button text="CREATE" type="submit" form={'reg-form'} />
                  )}
                </>
              )
            }}
          </Formik>
        </div>
      </main>
    </Layout>
  )
}
