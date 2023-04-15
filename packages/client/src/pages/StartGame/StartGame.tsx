import { GameWrapper } from '../../components/GameWrapper'
import s from './StartGame.module.scss'
import { Button } from '../../components/Button'
import { PATHNAMES } from '../../constants/pathnames'

export const StartGame = () => {
  return (
    <GameWrapper>
      <h1 className={s.title}>Galaxian</h1>
      <div className={s.description}>
        Galaxian is a series of fixed shooter video games developed by Namco.
        The first game in the series, Galaxian, was released in late fall 1979
        as an arcade slot machine and developed the ideas of the earlier Space
        Invaders game
      </div>
      <div className={s.actions}>
        <Button
          path={PATHNAMES.GAME}
          text={'Start game'}
          className={s.button}
        />
        <Button
          path={PATHNAMES.PRESENTATION}
          text={'About game'}
          className={s.button}
        />
      </div>
    </GameWrapper>
  )
}
