import React, { FC } from 'react'
import s from './Avatar.module.scss'
import avatarPlaceholder from '../../assets/images/avatarPlaceholder.svg'
import cn from 'classnames'

export type AvatarProps = {
  path?: string
  onClick?: () => void
  isEditable?: boolean
}

export const Avatar: FC<AvatarProps> = ({ path, onClick, isEditable }) => {
  return (
    <button
      className={cn(s.avatar__wrapper, {
        [s.avatar__wrapper_notEditable]: !isEditable,
      })}
      onClick={onClick}>
      <img
        className={s.avatar__img}
        src={path ? path : avatarPlaceholder}
        alt="Avatar"
      />
      {isEditable && <span className={s.avatar__text}> Поменять аватар </span>}
    </button>
  )
}
