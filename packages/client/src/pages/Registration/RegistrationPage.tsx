import React, { useCallback, useState } from 'react'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import s from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    confirm_password: '',
  })

  const createAccount = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      console.log(userData)
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
    <main className={s.registrationPage}>
      <div className={s.registrationForm}>
        <h1 className={s.title}>Create account</h1>
        <form className={s.form} name="registration form" id="reg-form">
          <Input
            label="Email"
            error={'Invalid Email'}
            name={'email'}
            pattern={'[a-zA-Z\\d-]+@+[a-zA-Z\\d-]+\\.+[a-zA-Z\\d-]*'}
            placeholder={'Email Address'}
            type={'email'}
            value={userData.email}
            isShowError={false}
            onChange={onChangeInput}
          />
          <Input
            label="Nickname"
            error={'Invalid nickname'}
            name={'login'}
            pattern={'^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$'}
            placeholder={'Nickname'}
            type={'text'}
            value={userData.login}
            isShowError={false}
            onChange={onChangeInput}
          />
          <Input
            label="Phone number"
            error={'Invalid number'}
            name={'phone'}
            pattern={'^[\\+]?[0-9]{10,15}$'}
            placeholder={'Phone number'}
            type={'number'}
            value={userData.phone}
            isShowError={false}
            onChange={onChangeInput}
          />
          <Input
            label="Name"
            error={'Invalid name'}
            name={'first_name'}
            pattern={'^[A-ZА-ЯЁ][^\\d^\\s][a-zа-яё-]*'}
            placeholder={'Name'}
            type={'text'}
            value={userData.first_name}
            isShowError={false}
            onChange={onChangeInput}
          />
          <Input
            label="Surname"
            error={'Invalid surname'}
            name={'second_name'}
            pattern={'^[A-ZА-ЯЁ][^\\d^\\s][a-zа-яё-]*'}
            placeholder={'Surname'}
            type={'text'}
            value={userData.second_name}
            isShowError={false}
            onChange={onChangeInput}
          />

          <Input
            label="Password"
            error={'Invalid password'}
            name={'password'}
            pattern={'^(?=^.{8,40}$)(?=.*\\d)(?=.*[A-Z]).*$'}
            placeholder={'Password'}
            type={'password'}
            value={userData.password}
            isShowError={false}
            onChange={onChangeInput}
          />
          <Input
            label="Confirm Password"
            error={'Invalid password'}
            name={'confirm_password'}
            pattern={'^(?=^.{8,40}$)(?=.*\\d)(?=.*[A-Z]).*$'}
            placeholder={'Confirm Password'}
            type={'password'}
            value={userData.confirm_password}
            isShowError={false}
            onChange={onChangeInput}
          />
        </form>
        <Button text="CREATE" onClick={createAccount} form={'reg-form'} />
      </div>
    </main>
  )
}
