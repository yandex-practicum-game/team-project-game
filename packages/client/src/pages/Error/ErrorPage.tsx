import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ErrorPage.module.scss'
import { Button } from '../../components/Button'

type ErrorPageProps = {
  title: string
  subtitle: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ title, subtitle }) => {
  const navigate = useNavigate()

  const goBack = function () {
    navigate(-1)
  }

  return (
    <div className={s.errorPage}>
      <div className={s.errorPage__container}>
        <h2 className={s.errorPage__title}>{title}</h2>
        <p className={s.errorPage__subtitle}>{subtitle}</p>
        <div className={s.errorPage__action}>
          <Button text="Go back" onClick={goBack} />
        </div>
      </div>
    </div>
  )
}
