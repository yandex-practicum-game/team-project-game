import React, { ErrorInfo } from 'react'
import s from './ErrorBoundary.module.scss'

interface Props {
  error: Error | null
  errorInfo: ErrorInfo
}

export const ErrorBoundaryInfo: React.FC<Props> = ({ error, errorInfo }) => {
  return (
    <div className={s.errorScreen}>
      <h2>Произошла ошибка. Свяжитесь со службой поддержки.</h2>
      <details className={s.description}>
        {error && error.toString()}
        <br />
        {errorInfo.componentStack}
      </details>
    </div>
  )
}
