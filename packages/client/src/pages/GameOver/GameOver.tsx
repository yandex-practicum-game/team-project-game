import { GameWrapper } from '../../components/GameWrapper'
import s from './GameOver.module.scss'
import { Button } from '../../components/Button'
import { PATHNAMES } from '../../constants/pathnames'
import { useNavigate } from 'react-router-dom'

export const GameOver = () => {
  const navigate = useNavigate()

  const goHomePage = () => {
    navigate(PATHNAMES.HOME)
  }

  const goStartPage = () => {
    navigate(PATHNAMES.GAME)
  }

  return (
    <GameWrapper>
      <h1 className={s.title}>Game Over</h1>
      <main className={s.pageContainer}>
        <nav className={s.leftSide}>
          <Button text={'Home'} onClick={goHomePage} className={s.button} />
          <Button text={'Leaderboard'} className={s.button} />
          <Button
            text={'Start again'}
            onClick={goStartPage}
            className={s.button}
          />
        </nav>
        <aside className={s.rightSide}>
          <div className={s.scoreContainer}>
            <p className={s.score}>FINAL SCORE</p>
            <div className={s.score}>5000</div>
          </div>
          <Button text={'Save score'} className={s.button} />
        </aside>
      </main>
    </GameWrapper>
  )
}
