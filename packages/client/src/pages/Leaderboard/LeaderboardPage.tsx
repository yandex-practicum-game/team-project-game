import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './LeaderboardPage.module.scss'
import { Button } from '../../components/Button'
import { LeaderBoardCard } from '../../components/LeaderBoardCard'
import { API_CONFIG } from '../../api/config'
import avatarPlaceholder from '../../assets/images/avatarPlaceholder.svg'
import { LeaderData } from '../../api/Leaderboard/types'
import { TEXTS } from '../../constants/requests'
import { useGetLeadersMutation } from '../../store/lidearboard.api'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import { Spinner } from '../../components/Spinner'

export const LeaderboardPage = () => {
  const navigate = useNavigate()
  const [getLeaders, { isLoading: isLeaderboardLoading }] =
    useGetLeadersMutation()
  const leadersList = useAppSelector(state => state.leaderboard.leadersList)
  const actions = useActions()

  useEffect(() => {
    console.log(leadersList)
    if (leadersList?.length === 0) {
      ;(async () => {
        try {
          await getLeaders({
            ratingFieldName: 'score',
            cursor: 0,
            limit: 100,
          })
            .unwrap()
            .then(res => {
              if (!res) return
              const leaders: LeaderData[] = res.map(
                (leader: { data: LeaderData }): LeaderData => {
                  return leader.data
                }
              )
              actions.setLeaders(leaders)
            })
        } catch {
          console.error(TEXTS.ERROR)
        }
      })()
    }
  }, [])

  const goBack = function () {
    navigate(-1)
  }

  return (
    <div className={s.LeaderboardPage}>
      <div className={s.LeaderboardPage__container}>
        {isLeaderboardLoading ? (
          <Spinner />
        ) : (
          <>
            <h2 className={s.LeaderboardPage__title}>Leaderboard</h2>
            <ul className={s.LeaderboardPage__list}>
              {leadersList.length > 0 &&
                leadersList.map((user, index) => (
                  <LeaderBoardCard
                    position={index + 1}
                    score={user.score}
                    avatar={
                      user.avatar
                        ? `${API_CONFIG.RESOURCES_URL}${user.avatar}`
                        : avatarPlaceholder
                    }
                    userName={user.login}
                    key={user.id}
                  />
                ))}
              {leadersList.length === 0 && (
                <p className={s.LeaderboardPage__hint}>
                  Leaderboard is empty now. Be first!
                </p>
              )}
            </ul>
            <Button text="Go back" onClick={goBack} />
          </>
        )}
      </div>
    </div>
  )
}
