import React, { ReactNode } from 'react'
import s from './GameWrapper.module.scss'

type Props = {
  children: ReactNode
}

export const GameWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className={s.backdrop}>
      <div className={s.startGame}>{children}</div>
    </div>
  )
}
