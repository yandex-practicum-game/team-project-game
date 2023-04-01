import React, { FC } from 'react'
import s from './Avatar.module.scss'

import avatarPlaceholder from '../../assets/images/avatarPlaceholder.svg'

import './Avatar.module.scss'

export type AvatarProps = {
  path?: string
  onClick?: () => void
  isEditable?: boolean
}

export const Avatar: FC<AvatarProps> = ({ path, onClick, isEditable }) => {
  return (
    <div className={s.avatar__wrapper} onClick={onClick}>
      <img
        className={s.avatar__img}
        src={path ? path : avatarPlaceholder}
        alt="Avatar"
      />
      {isEditable && <span className={s.avatar__text}> Поменять аватар </span>}
    </div>
  )
}
