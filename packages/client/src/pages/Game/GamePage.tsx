import s from './GamePage.module.scss'

import { useRef, useEffect } from 'react'
import { Game } from './core/Game'

const width = window.innerWidth
const height = window.innerHeight

export const GamePage = () => {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const context = ref.current?.getContext('2d')

    if (!context) {
      return
    }

    Game.start(context)
  }, [])

  return (
    <div className={s.game}>
      <canvas ref={ref} width={width} height={height} className={s.canvas}>
        <h1>Canvas not supported</h1>
      </canvas>
    </div>
  )
}
