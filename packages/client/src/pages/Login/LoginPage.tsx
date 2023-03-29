import React, { useCallback, useEffect, useState } from 'react'
import request from 'axios'

import s from './LoginPage.module.scss'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { AuthAPI } from '../../api/Auth/AuthAPI'
import { ReasonResponse } from '../../api/Auth/types'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'
import { Formik } from 'formik'

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
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    AuthAPI.getUser()
      .then(response => {
        const user = response.data
        console.log('user', user)
        console.log('Success get user, redirect to game page') // TODO
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

  const login = useCallback(async (userData: UserData) => {
    setLoginError('')
    setIsLoading(true)

    try {
      await AuthAPI.signin(userData)
      console.log('Success Login, redirect to game page')
    } catch (error) {
      if (request.isAxiosError(error) && error.response) {
        const data = error.response.data as ReasonResponse
        setLoginError(data.reason)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

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
            {({ errors, handleSubmit, handleChange, values, touched }) => {
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
