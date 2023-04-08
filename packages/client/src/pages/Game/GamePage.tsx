import s from './GamePage.module.scss'

import { useRef, useEffect } from 'react'
import { Game } from './core/Game'
import { Emitter } from './core/Emitter'

const width = window.innerWidth
const height = window.innerHeight

export const GamePage = () => {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const context = ref.current?.getContext('2d')
    const emitter = Emitter.getInstance()

    if (!context) {
      return
    }

    Game.init(context, emitter)
  }, [])

  return (
    <div className={s.game}>
      <canvas ref={ref} width={width} height={height} className={s.canvas}>
        <h1>Canvas not supported</h1>
      </canvas>
    </div>
  )
}
