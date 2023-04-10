import React, { useCallback, useState } from 'react'

import s from './LoginPage.module.scss'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'
import { Formik } from 'formik'
import { useGetUserQuery, useSignInMutation } from '../../store/user/user.api'

type UserData = {
  login: string
  password: string
}

const userData: UserData = {
  login: '',
  password: '',
}

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .required('required')
    .matches(/^[^\d][^\s][a-zA-Z\d_-]{1,18}$/, 'Invalid login'),
  password: Yup.string()
    .required('required')
    .matches(/^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/, 'Invalid password'),
})

export const LoginPage = () => {
  const [loginError, setLoginError] = useState('')
  const { isLoading: isGetUserLoading } = useGetUserQuery('')
  const [signIn, { isLoading: isLoginLoading }] = useSignInMutation()

  const login = useCallback((userData: UserData) => {
    setLoginError('')

    // TODO: async await or promise for redirect
    signIn(userData)
  }, [])

  const isLoading = isGetUserLoading || isLoginLoading

  return (
    <main className={s.loginPage}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={s.loginForm}>
          <h1 className={s.title}>Enter to Game</h1>
          <Formik
            validationSchema={validationSchema}
            initialValues={userData}
            validateOnChange
            validateOnBlur
            onSubmit={login}>
            {({ errors, handleSubmit, handleChange, values }) => {
              return (
                <>
                  <form
                    onSubmit={handleSubmit}
                    className={s.form}
                    name="login form"
                    id="login-form">
                    <Input
                      label={'Nickname'}
                      error={errors.login}
                      name={'login'}
                      placeholder={'Nickname'}
                      type={'text'}
                      value={values.login}
                      onChange={handleChange}
                    />
                    <Input
                      label={'Password'}
                      error={errors.password}
                      name={'password'}
                      placeholder={'Password'}
                      type={'password'}
                      value={values.password}
                      onChange={handleChange}
                    />
                  </form>
                  {loginError && (
                    <span className={s.loginError}>{loginError}</span>
                  )}
                  <Button text={'ENTER'} type="submit" form={'login-form'} />
                </>
              )
            }}
          </Formik>

          <Link className={s.registrationLink} to={PATHNAMES.REGISTRATION}>
            Don't you have an account yet?
          </Link>
        </div>
      )}
    </main>
  )
}
