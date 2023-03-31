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
    navigate(PATHNAMES.GALAXIA)
  }

  return (
    <GameWrapper>
      <h1 className={s.title}>Game Over</h1>
      <div className={s.pageContainer}>
        <div className={s.leftSide}>
          <Button text={'Home'} onClick={goHomePage} className={s.button} />
          <Button text={'Leaderboard'} className={s.button} />
          <Button
            text={'Start again'}
            onClick={goStartPage}
            className={s.button}
          />
        </div>
        <div className={s.rightSide}>
          <div className={s.scoreContainer}>
            <p className={s.score}>FINAL SCORE</p>
            <div className={s.score}>5000</div>
          </div>
          <Button text={'Save score'} className={s.button} />
        </div>
      </div>
    </GameWrapper>
  )
}
