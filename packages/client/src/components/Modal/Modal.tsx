import React, { forwardRef, PropsWithChildren } from 'react'
import { Button } from '../Button'
import s from './Modal.module.scss'

type PopupProps = PropsWithChildren & {
  title: string
  onClick: () => void
  descriptionText: string
  showDescription: boolean
  buttonText: string
}

export const Modal = forwardRef<HTMLInputElement, PopupProps>(
  (
    { title, buttonText, onClick, children, showDescription, descriptionText },
    ref
  ) => {
    return (
      <div ref={ref} className={s.modal}>
        <p className={s.modal__title}>{title}</p>
        {children}
        <Button text={buttonText} onClick={onClick}></Button>
        {showDescription && (
          <p className={s.modal__description}> {descriptionText} </p>
        )}
      </div>
    )
  }
)
