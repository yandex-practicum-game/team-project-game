import React, { memo } from 'react'
import cn from 'classnames'
import s from './Button.module.scss'

export type ButtonProps = {
  text: string
  form?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = memo<ButtonProps>(props => {
  const { onClick, text, form, type, className } = props

  return (
    <button
      className={cn(s.button, className)}
      onClick={onClick}
      form={form}
      type={type}>
      {text}
    </button>
  )
})
