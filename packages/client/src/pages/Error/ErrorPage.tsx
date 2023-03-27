import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './ErrorPage.module.scss'
import { Button } from '../../components/Button'

interface IErrorPage {
  errorTitle: string
  errorSubtitle: string
}

export const ErrorPage: FC<IErrorPage> = ({ errorTitle, errorSubtitle }) => {
  const navigate = useNavigate()

  return (
    <div className={s.errorPage}>
      <div className={s.errorPage__container}>
        <h2 className={s.errorPage__title}>{errorTitle}</h2>
        <p className={s.errorPage__subtitle}>{errorSubtitle}</p>
        <div className={s.errorPage__action}>
          <Button text="Назад" onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  )
}
