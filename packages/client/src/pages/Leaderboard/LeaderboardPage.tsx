import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './LeaderboardPage.module.scss'
import { Button } from '../../components/Button'
import { mockLeadersList } from './mock'
import { LeaderBoardCard } from '../../components/LeaderBoardCard'
import { API_CONFIG } from '../../api/config'
import avatarPlaceholder from '../../assets/images/avatarPlaceholder.svg'

export const LeaderboardPage = () => {
  const navigate = useNavigate()

  const goBack = function () {
    navigate(-1)
  }

  return (
    <div className={s.LeaderboardPage}>
      <div className={s.LeaderboardPage__container}>
        <h2 className={s.LeaderboardPage__title}>Leaderboard</h2>
        <ul className={s.LeaderboardPage__list}>
          {mockLeadersList &&
            mockLeadersList.map((user, index) => (
              <LeaderBoardCard
                position={index + 1}
                score={user.score}
                avatar={
                  user.avatar
                    ? `${API_CONFIG.RESOURCES_URL}${user.avatar}`
                    : avatarPlaceholder
                }
                userName={
                  user.displayName || `${user.firstName} ${user.secondName}`
                }
                key={'leader' + index}
              />
            ))}
        </ul>
        <Button text="Go back" onClick={goBack} />
      </div>
    </div>
  )
}
