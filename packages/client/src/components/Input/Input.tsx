import React, { memo } from 'react'
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
  isShowError?: boolean
}

export const Input = memo<InputProps>(props => {
  const {
    error,
    name,
    onChange,
    type,
    value,
    pattern,
    placeholder,
    isShowError = true,
    label,
  } = props

  return (
    <div className={s.inputComponent}>
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
      <label htmlFor={name} className={s.label}>
        <span> {label}</span>

        {isShowError && <span className={s.error}>{error}</span>}
      </label>
    </div>
  )
})
