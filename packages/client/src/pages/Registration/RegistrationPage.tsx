import React, { useCallback, useState } from 'react'

import { Formik } from 'formik'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import s from './RegistrationPage.module.scss'
import * as Yup from 'yup'

type UserData = {
  email: string
  login: string
  first_name: string
  second_name: string
  phone: string
  password: string
  confirm_password: string
}

const userData: UserData = {
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
  email: Yup.string().matches(/[a-zA-Z\d-]+@+[a-zA-Z\d-]+\.+[a-zA-Z\d-]*/),
  login: Yup.string().matches(/^[^\d][^\s][a-zA-Z\d_-]{1,18}$/),
  first_name: Yup.string().matches(/^[A-ZА-ЯЁ][^\d^\s][a-zа-яё-]*/),
  second_name: Yup.string().matches(/^[A-ZА-ЯЁ][^\d^\s][a-zа-яё-]*/),
  phone: Yup.string().matches(/^[\+]?[0-9]{10,15}$/),
  password: Yup.string().matches(/^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/),
  confirm_password: Yup.string().matches(
    /^(?=^.{8,40}$)(?=.*\d)(?=.*[A-Z]).*$/
  ),
})

export const RegistrationPage = () => {
  const [error, setError] = useState('')

  const createAccount = useCallback((userData: UserData) => {
    if (Object.values(userData).includes('')) {
      setError('Please fill in all the fields')
      return
    }

    setError('')
    console.log('userData:', userData)
  }, [])

  return (
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
                {error && <span className={s.regError}>{error}</span>}
                <Button text="CREATE" type="submit" form={'reg-form'} />
              </>
            )
          }}
        </Formik>
      </div>
    </main>
  )
}
