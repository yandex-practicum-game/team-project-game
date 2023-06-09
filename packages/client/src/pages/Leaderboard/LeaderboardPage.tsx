import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './LeaderboardPage.module.scss'
import { Button } from '../../components/Button'
import { LeaderBoardCard } from '../../components/LeaderBoardCard'
import avatarPlaceholder from '../../assets/images/avatarPlaceholder.svg'
import { TEXTS } from '../../constants/requests'
import { useGetLeadersMutation } from '../../store/lidearboard.api'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import { Spinner } from '../../components/Spinner'
import { RESOURCES_URL } from '../../constants/apiConfig'
import { useAlert } from 'react-alert'
import { withAuth } from '../../hocs/withAuth'
import { Layout } from '../../components/Layout'

export const LeaderboardPage = () => {
  const navigate = useNavigate()
  const [getLeaders, { isLoading }] = useGetLeadersMutation()
  const leadersList = useAppSelector(state => state.leaderboard.leadersList)
  const isMount = useAppSelector(state => state.leaderboard.isMount)
  const actions = useActions()
  const alert = useAlert()

  useEffect(() => {
    if (leadersList?.length !== 0) {
      return
    }

    const fetchLeaders = async () => {
      try {
        const leaderData = await getLeaders({
          ratingFieldName: 'score',
          cursor: 0,
          limit: 100,
        }).unwrap()

        if (!leaderData) {
          return
        }

        const leaders = leaderData.map(leader => leader.data)

        actions.setLeaders(leaders)
      } catch {
        if (isMount) {
          alert.show(TEXTS.ERROR)
        }
      }
    }

    fetchLeaders()
    actions.setIsMount(true)

    return () => {
      actions.setIsMount(false)
    }
  }, [])

  const goBack = function () {
    navigate(-1)
  }

  return (
    <Layout>
      <div className={s.LeaderboardPage}>
        <div className={s.LeaderboardPage__container}>
          {isLoading ? (
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
                          ? `${RESOURCES_URL}${user.avatar}`
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
    </Layout>
  )
}

export default withAuth(LeaderboardPage)
