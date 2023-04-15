import { GameWrapper } from '../../components/GameWrapper'
import s from './GameOver.module.scss'
import { Button } from '../../components/Button'
import { PATHNAMES } from '../../constants/pathnames'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useGetUserQuery } from '../../store/base.api'
import {
  useGetLeadersMutation,
  useSetLeaderMutation,
} from '../../store/lidearboard.api'
import { TEXTS } from '../../constants/requests'
import { LeaderData } from '../../api/Leaderboard/types'
import { useActions } from '../../hooks/useActions'
import { useState } from 'react'

export const GameOver = () => {
  const score = useAppSelector(state => state.game.score)
  const { data: user } = useGetUserQuery(null)
  const [hint, setHint] = useState('')
  const [getLeaders] = useGetLeadersMutation()
  const [setLeader] = useSetLeaderMutation()
  const actions = useActions()

  const saveScore = async () => {
    try {
      await setLeader({
        id: user.id,
        login: user.login,
        score: score,
        avatar: user.avatar,
      })
        .unwrap()
        .then(async () => {
          setHint('Your score is saved')
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
        })
    } catch {
      console.error(TEXTS.ERROR)
    }
  }

  return (
    <GameWrapper>
      <h1 className={s.title}>Game Over</h1>
      <main className={s.pageContainer}>
        <nav className={s.leftSide}>
          <Button text={'Home'} path={PATHNAMES.HOME} className={s.button} />
          <Button
            text={'Leaderboard'}
            path={PATHNAMES.LEADERBOARD}
            className={s.button}
          />
          <Button
            text={'Start again'}
            path={PATHNAMES.GAME}
            className={s.button}
          />
        </nav>
        <aside className={s.rightSide}>
          <div className={s.scoreContainer}>
            <p className={s.score}>FINAL SCORE</p>
            <div className={s.score}>{score}</div>
          </div>
          {!hint && (
            <Button
              text={'Save score'}
              onClick={saveScore}
              className={s.button}
            />
          )}
        </aside>
      </main>
      {hint && <p className={s.hint}>{hint}</p>}
    </GameWrapper>
  )
}
