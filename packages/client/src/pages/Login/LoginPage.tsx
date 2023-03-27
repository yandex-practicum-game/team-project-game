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

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState('')
  const [userData, setUserData] = useState({ login: '', password: '' })

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

  const login = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
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
    },
    [userData]
  )

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement
      const name = target.name
      const value = target.value

      setUserData(prevValue => ({ ...prevValue, [name]: value }))
    },
    []
  )

  return (
    <main className={s.loginPage}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={s.loginForm}>
          <h1 className={s.title}>Enter to Game</h1>
          <form className={s.form} name="login form" id="login-form">
            <Input
              label={'Nickname'}
              error={'Invalid Login'}
              name={'login'}
              pattern={'^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$'}
              placeholder={'Nickname'}
              type={'text'}
              value={userData.login}
              isShowError={false}
              onChange={onChangeInput}
            />
            <Input
              label={'Password'}
              error={'Invalid password'}
              name={'password'}
              pattern={'^(?=^.{8,40}$)(?=.*\\d)(?=.*[A-Z]).*$'}
              placeholder={'Password'}
              type={'password'}
              value={userData.password}
              isShowError={false}
              onChange={onChangeInput}
            />
          </form>
          {loginError && <span className={s.loginError}>{loginError}</span>}
          <Button text={'enter'} onClick={login} form={'login-form'} />
          <Link className={s.registrationLink} to={PATHNAMES.REGISTRATION}>
            Don't you have an account yet?
          </Link>
        </div>
      )}
    </main>
  )
}
