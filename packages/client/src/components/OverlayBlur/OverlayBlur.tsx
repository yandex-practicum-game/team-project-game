import React, { BaseSyntheticEvent, FC, PropsWithChildren } from 'react'
import s from './OverlayBlur.module.scss'

type OverlayBlurProps = PropsWithChildren & {
  onClick: (event: BaseSyntheticEvent) => void
}

export const OverlayBlur: FC<OverlayBlurProps> = ({ onClick, children }) => {
  return (
    <div className={s.overlayBlur} onClick={onClick}>
      {children}
    </div>
  )
}
