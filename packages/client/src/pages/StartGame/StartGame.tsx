import { GameWrapper } from '../../components/GameWrapper'
import s from './StartGame.module.scss'
import { Button } from '../../components/Button'
import { withAuth } from '../../hocs/withAuth'

const StartGame = () => {
  return (
    <GameWrapper>
      <h1 className={s.title}>Start Game</h1>
      <Button text={'Start'} type="submit" className={s.button} />
    </GameWrapper>
  )
}

export default withAuth(StartGame)
