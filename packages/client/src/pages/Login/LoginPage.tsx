import React, { useCallback, useState } from 'react'

import s from './LoginPage.module.scss'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Spinner } from '../../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { PATHNAMES } from '../../constants/pathnames'
import { Formik } from 'formik'
import { useGetUserQuery, useSignInMutation } from '../../store/base.api'
import { TEXTS } from '../../constants/requests'
import { Layout } from '../../components/Layout'
import { useLazyGetServiceIdQuery } from '../../store/oauth.api'
import { API_CONFIG } from '../../constants/apiConfig'

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
  const { isLoading: isGetUserLoading } = useGetUserQuery(null)
  const [fetchServiceId] = useLazyGetServiceIdQuery()
  const [signIn, { isLoading: isLoginLoading }] = useSignInMutation()
  const navigate = useNavigate()

  const login = useCallback(async (userData: UserData) => {
    setLoginError('')

    try {
      await signIn(userData).unwrap()
      navigate('/')
    } catch {
      setLoginError(TEXTS.ERROR)
    }
  }, [])

  const loginOAuth = useCallback(async () => {
    setLoginError('')
    try {
      const id = await fetchServiceId(API_CONFIG.REDIRECT_URI)
      window.open(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id.data?.service_id}&redirect_uri=${API_CONFIG.REDIRECT_URI}`,
        '_self'
      )
    } catch {
      setLoginError(TEXTS.ERROR)
    }
  }, [])

  const isLoading = isGetUserLoading || isLoginLoading

  return (
    <Layout>
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
                    <Button
                      text={'Sign in'}
                      type="submit"
                      form={'login-form'}
                    />
                  </>
                )
              }}
            </Formik>
            <Button
              className={s.oauthButton}
              text={'Sign in with Yandex'}
              type="button"
              onClick={loginOAuth}
            />
            <Link className={s.registrationLink} to={PATHNAMES.REGISTRATION}>
              Don't you have an account yet?
            </Link>
          </div>
        )}
      </main>
    </Layout>
  )
}
