import React, { FC } from 'react'
import s from './InfoRow.module.scss'

type InfoRowProps = {
  name: string
  value: string
}

export const InfoRow: FC<InfoRowProps> = ({ name, value }) => {
  return (
    <div className={s.infoRow}>
      <div className={s.infoRow__name}>{name}</div>
      <div className={s.infoRow__value}>{value}</div>
    </div>
  )
}
