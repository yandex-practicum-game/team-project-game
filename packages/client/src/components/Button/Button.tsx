import React, { memo } from 'react'
import s from './Button.module.scss'
import { Link } from 'react-router-dom'

export type ButtonProps = {
  text: string
  form?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  path?: string
}

export const Button = memo<ButtonProps>(props => {
  const { onClick, text, form, type, path } = props

  return path ? (
    <Link to={path} className={s.button}>
      {text}
    </Link>
  ) : (
    <button className={s.button} onClick={onClick} form={form} type={type}>
      {text}
    </button>
  )
})
