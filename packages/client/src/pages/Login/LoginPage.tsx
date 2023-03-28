import React, { useCallback, useEffect, useState } from 'react'
import request from 'axios'

import s from './LoginPage.module.scss'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { AuthAPI } from '../../api/Auth/AuthAPI'
import { ReasonResponse } from '../../api/Auth/types'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'
import { Formik } from 'formik'

type UserData = { login: string; password: string }

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState('')
  const [userData] = useState<UserData>({ login: '', password: '' })

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

  const login = useCallback(async (values: UserData) => {
    setIsLoading(true)
    try {
      await AuthAPI.signin(values)
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

  const validate = useCallback((values: UserData) => {
    const errors = {} as Record<string, unknown>

    if (!values.login.match('^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$')) {
      errors.login = 'Invalid login'
    }
    if (!values.password.match('^(?=^.{8,40}$)(?=.*\\d)(?=.*[A-Z]).*$')) {
      errors.password = 'Invalid password'
    }

    return errors
  }, [])

  return (
    <main className={s.loginPage}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={s.loginForm}>
          <h1 className={s.title}>Enter to Game</h1>
          <Formik initialValues={userData} validate={validate} onSubmit={login}>
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
                      error={'Invalid Login'}
                      name={'login'}
                      placeholder={'Nickname'}
                      type={'text'}
                      value={values.login}
                      onChange={handleChange}
                      isShowError={!!errors.login}
                    />
                    <Input
                      label={'Password'}
                      error={'Invalid password'}
                      name={'password'}
                      placeholder={'Password'}
                      type={'password'}
                      value={values.password}
                      onChange={handleChange}
                      isShowError={!!errors.password}
                    />
                  </form>
                  {loginError && (
                    <span className={s.loginError}>{loginError}</span>
                  )}
                  <Button text={'enter'} type="submit" form={'login-form'} />
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
