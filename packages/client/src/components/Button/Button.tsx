import React from 'react'
import s from './Button.module.scss'

export type ButtonProps = {
  text: string
  form?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = props => {
  const { onClick, text, form, type } = props

  return (
    <button className={s.button} onClick={onClick} form={form} type={type}>
      {text}
    </button>
  )
}
