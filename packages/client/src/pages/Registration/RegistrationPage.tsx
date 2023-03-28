import { Formik } from 'formik'
import React, { useCallback, useState } from 'react'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import s from './RegistrationPage.module.scss'

type UserData = {
  email: string
  login: string
  first_name: string
  second_name: string
  phone: string
  password: string
  confirm_password: string
}

export const RegistrationPage = () => {
  const [userData] = useState<UserData>({
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    password: '',
    confirm_password: '',
  })

  const createAccount = useCallback((values: UserData) => {
    console.log('userData:', values)
  }, [])

  const validate = useCallback((values: UserData) => {
    const errors = {} as Record<string, unknown>

    if (!values.email.match('[a-zA-Z\\d-]+@+[a-zA-Z\\d-]+\\.+[a-zA-Z\\d-]*')) {
      errors.email = 'Invalid email'
    }
    if (!values.login.match('^[^\\d][^\\s][a-zA-Z\\d_-]{1,18}$')) {
      errors.login = 'Invalid login'
    }
    if (!values.first_name.match('^[A-ZА-ЯЁ][^\\d^\\s][a-zа-яё-]*')) {
      errors.first_name = 'Invalid first name'
    }
    if (!values.second_name.match('^[A-ZА-ЯЁ][^\\d^\\s][a-zа-яё-]*')) {
      errors.second_name = 'Invalid second name'
    }
    if (!String(values.phone).match('^[\\+]?[0-9]{10,15}$')) {
      errors.phone = 'Invalid phone'
    }
    if (!values.password.match('^(?=^.{8,40}$)(?=.*\\d)(?=.*[A-Z]).*$')) {
      errors.password = 'Invalid password'
    }
    if (
      !values.confirm_password.match('^(?=^.{8,40}$)(?=.*\\d)(?=.*[A-Z]).*$')
    ) {
      errors.confirm_password = 'Invalid confirmpassword'
    }

    return errors
  }, [])

  return (
    <main className={s.registrationPage}>
      <div className={s.registrationForm}>
        <h1 className={s.title}>Create account</h1>
        <Formik
          initialValues={userData}
          validate={validate}
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
                    error={'Invalid Email'}
                    name={'email'}
                    placeholder={'Email Address'}
                    type={'email'}
                    value={values.email}
                    isShowError={!!errors.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Nickname"
                    error={'Invalid nickname'}
                    name={'login'}
                    placeholder={'Nickname'}
                    type={'text'}
                    value={values.login}
                    isShowError={!!errors.login}
                    onChange={handleChange}
                  />
                  <Input
                    label="Phone number"
                    error={'Invalid number'}
                    name={'phone'}
                    placeholder={'Phone number'}
                    type={'number'}
                    value={values.phone}
                    isShowError={!!errors.phone}
                    onChange={handleChange}
                  />
                  <Input
                    label="Name"
                    error={'Invalid name'}
                    name={'first_name'}
                    placeholder={'Name'}
                    type={'text'}
                    value={values.first_name}
                    isShowError={!!errors.first_name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Surname"
                    error={'Invalid surname'}
                    name={'second_name'}
                    placeholder={'Surname'}
                    type={'text'}
                    value={values.second_name}
                    isShowError={!!errors.second_name}
                    onChange={handleChange}
                  />

                  <Input
                    label="Password"
                    error={'Invalid password'}
                    name={'password'}
                    placeholder={'Password'}
                    type={'password'}
                    value={values.password}
                    isShowError={!!errors.password}
                    onChange={handleChange}
                  />
                  <Input
                    label="Confirm Password"
                    error={'Invalid password'}
                    name={'confirm_password'}
                    placeholder={'Confirm Password'}
                    type={'password'}
                    value={values.confirm_password}
                    isShowError={!!errors.confirm_password}
                    onChange={handleChange}
                  />
                </form>
                <Button text="CREATE" type="submit" form={'reg-form'} />
              </>
            )
          }}
        </Formik>
      </div>
    </main>
  )
}
