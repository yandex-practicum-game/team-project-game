import React, { useCallback, useEffect, useState } from 'react'
import request from 'axios'

import s from './LoginPage.module.scss'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { AuthAPI } from '../../api/Auth/AuthAPI'
import { ReasonResponse } from '../../api/Auth/types'
import { Spinner } from '../../components/Spinner'

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState('')
  const [inputValues, setInputValues] = useState({ login: '', password: '' })

  useEffect(() => {
    getUser()
  }, [])

  const getUser = useCallback(async () => {
    try {
      const { data: user } = await AuthAPI.getUser()
      console.log('user', user)
      console.log('Success get user, redirect to game page') // TODO
    } catch (error) {
      if (request.isAxiosError(error) && error.response) {
        const data = error.response.data as ReasonResponse
        console.log('get user error:', data.reason)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsLoading(true)
      try {
        await AuthAPI.signin(inputValues)
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
    [inputValues, loginError]
  )

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement
      const name = target.name
      const value = target.value

      setInputValues({ ...inputValues, [name]: value })
    },
    [inputValues, setInputValues]
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
              value={inputValues.login}
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
              value={inputValues.password}
              isShowError={false}
              onChange={onChangeInput}
            />
          </form>
          {loginError && <span className={s.loginError}>{loginError}</span>}
          <Button text={'enter'} onClick={login} form={'login-form'} />
          <a href="#" className={s.registrationLink}>
            Don't you have an account yet?
          </a>
        </div>
      )}
    </main>
  )
}
