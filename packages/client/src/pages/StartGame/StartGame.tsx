import { GameWrapper } from '../../components/GameWrapper'
import s from './StartGame.module.scss'
import { Button } from '../../components/Button'

export const StartGame = () => {
  return (
    <GameWrapper>
      <h1 className={s.title}>Start Game</h1>
      <Button text={'Start'} type="submit" className={s.button} />
    </GameWrapper>
  )
}
