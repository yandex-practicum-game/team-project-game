import React, { memo } from 'react'
import cn from 'classnames'
import s from './Button.module.scss'
import { Link } from 'react-router-dom'

export type ButtonProps = {
  text: string
  form?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  path?: string
}

export const Button = memo<ButtonProps>(props => {
  const { onClick, text, form, type, className, path } = props

  return path ? (
    <Link to={path} className={cn(s.button, className)}>
      {text}
    </Link>
  ) : (
    <button
      className={cn(s.button, className)}
      onClick={onClick}
      form={form}
      type={type}>
      {text}
    </button>
  )
})
