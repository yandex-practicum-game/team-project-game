import React from 'react'
import s from './Input.module.scss'

export type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  placeholder: string
  pattern: string
  error: string
  name: string
  type: string
  value: string
  isShowError: boolean
}

export const Input: React.FC<InputProps> = props => {
  const {
    error,
    name,
    onChange,
    type,
    value,
    pattern,
    placeholder,
    isShowError,
    label,
  } = props

  return (
    <div className={s.inputComponent}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <input
        className={s.input}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        pattern={pattern}
        onChange={onChange}
      />
      {isShowError && <span className={s.error}>{error}</span>}
    </div>
  )
}
