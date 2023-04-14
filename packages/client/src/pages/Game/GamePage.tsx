import s from './GamePage.module.scss'

import { useRef, useEffect, useState } from 'react'
import { Game } from './core/Game'
import { Emitter } from './core/Emitter'
import { useNavigate } from 'react-router-dom'
import { EVENTS } from './core/Events'
import { PATHNAMES } from '../../constants/pathnames'

const width = window.innerWidth
const height = window.innerHeight

export const GamePage = () => {
  const nav = useNavigate()
  const ref = useRef<HTMLCanvasElement | null>(null)

  const [score, setScore] = useState<number>(0)
  const [scoreInterval, setScoreInterval] = useState<number>(0)

  useEffect(() => {
    const context = ref.current?.getContext('2d')
    const emitter = Emitter.getInstance()

    if (!context) {
      return
    }

    const startGame = () => {
      const interval = window.setInterval(() => {
        setScore(prev => prev + 1)
      }, 1000)
      setScoreInterval(interval)
    }

    const stopGame = () => {
      nav(PATHNAMES.GAMEOVER)
      window.clearInterval(scoreInterval)
    }

    emitter.on(EVENTS.START_GAME, startGame)
    emitter.on(EVENTS.STOP_GAME, stopGame)

    Game.init(context, emitter)

    return () => {
      window.clearInterval(scoreInterval)
      emitter.off(EVENTS.START_GAME, startGame)
      emitter.off(EVENTS.STOP_GAME, stopGame)
    }
  }, [scoreInterval])

  return (
    <div className={s.game}>
      <canvas ref={ref} width={width} height={height} className={s.canvas}>
        <h1>Canvas not supported</h1>
      </canvas>
      <div className={s.score}>SCORE: {score}</div>
    </div>
  )
}
