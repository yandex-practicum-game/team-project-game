import React, { FC, memo } from 'react'
import avatarPlaceholder from '../../assets/images/avatarPlaceholder.svg'
import s from './LeaderBoardCard.module.scss'

export type LeaderProps = {
  position: number
  score: number
  avatar?: string
  userName: string
}

export const LeaderBoardCard: FC<LeaderProps> = memo<LeaderProps>(
  ({ position, score, userName, avatar }) => {
    return (
      <li className={s.leaderboardItem}>
        <div className={s.leaderboardItem__position}>{position}</div>
        <img
          className={s.leaderboardItem__avatar}
          src={avatar ?? avatarPlaceholder}
          alt={'avatar'}
        />
        <div className={s.leaderboardItem__info}>
          <div className={s.leaderboardItem__name}>{userName}</div>
          <div className={s.leaderboardItem__score}>{score}</div>
        </div>
      </li>
    )
  }
)
