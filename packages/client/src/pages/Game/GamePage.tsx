import s from './GamePage.module.scss'

import { useRef, useEffect } from 'react'
import { Game } from './core/Game'
import { Emitter } from './core/Emitter'
import { useNavigate } from 'react-router-dom'
import { EVENTS } from './core/Events'
import { PATHNAMES } from '../../constants/pathnames'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useActions } from '../../hooks/useActions'
import { withAuth } from '../../hocs/withAuth'
import { DEFAULT_INNER_HEIGHT, DEFAULT_INNER_WIDTH } from './GamePage.constants'

const width = globalThis.innerWidth || DEFAULT_INNER_WIDTH
const height = globalThis.innerHeight || DEFAULT_INNER_HEIGHT

const GamePage = () => {
  const navigate = useNavigate()
  const ref = useRef<HTMLCanvasElement | null>(null)

  const game = useAppSelector(state => state.game)
  const actions = useActions()

  useEffect(() => {
    const { current } = ref
    const context = current?.getContext('2d')
    const emitter = Emitter.getInstance()

    if (!context || !current) {
      return
    }

    current.requestPointerLock()

    const startGame = () => {
      const interval = globalThis.setInterval(() => {
        actions.accrueScore()
      }, 1000)
      actions.resetScore()
      actions.setScoreInterval(interval as unknown as number)
    }

    const stopGame = () => {
      navigate(PATHNAMES.GAMEOVER)
      globalThis.clearInterval(game.scoreInterval)
    }

    emitter.on(EVENTS.START_GAME, startGame)
    emitter.on(EVENTS.STOP_GAME, stopGame)

    Game.init(context, emitter)

    return () => {
      globalThis.clearInterval(game.scoreInterval)
      emitter.off(EVENTS.START_GAME, startGame)
      emitter.off(EVENTS.STOP_GAME, stopGame)
    }
  }, [game.scoreInterval])

  return (
    <div className={s.game}>
      <canvas ref={ref} width={width} height={height} className={s.canvas}>
        <h1>Canvas not supported</h1>
      </canvas>
      <div className={s.score}>SCORE: {game.score}</div>
      <div className={s.fullscreenHint}>
        Press <strong>F</strong> to set fullscreen mode
      </div>
    </div>
  )
}

export default withAuth(GamePage)
