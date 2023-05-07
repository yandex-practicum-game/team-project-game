import { KEYS } from '../../../constants/keys'
import {
  DEFAULT_INNER_HEIGHT,
  DEFAULT_INNER_WIDTH,
} from '../GamePage.constants'
import { Emitter } from './Emitter'
import { Enemy } from './Enemy'
import { EVENTS } from './Events'
import { Player } from './Player'

export class Game {
  public static instance: Game

  private isStart = false
  private player!: Player
  private enemy!: Enemy
  private board = {
    width: globalThis.innerWidth || DEFAULT_INNER_WIDTH,
    height: globalThis.innerHeight || DEFAULT_INNER_HEIGHT,
  }
  private listeners!: {
    keydown: (e: KeyboardEvent) => void
    keyup: (e: KeyboardEvent) => void
  }

  private constructor(private emitter: Emitter) {}

  public static init(ctx: CanvasRenderingContext2D, emitter: Emitter) {
    if (!Game.instance) {
      Game.instance = new Game(emitter)
    }

    Game.instance.start(ctx)
  }

  private start(ctx: CanvasRenderingContext2D) {
    // для strict mode
    if (this.isStart) {
      return
    }

    // запускаем подсчет очков в компоненте
    this.isStart = true
    this.emitter.emit(EVENTS.START_GAME)

    // создаем игрока и противника
    this.player = new Player(ctx, this.board)
    this.enemy = new Enemy(this.emitter, ctx, this.player, this.board)

    // навешиваем слушаетелей на кнопки
    this.addKeyListenters()

    // подписываемся на стоп игру
    const stopGame = () => {
      this.stop()
      this.emitter.off(EVENTS.STOP_GAME, stopGame)
    }

    this.emitter.on(EVENTS.STOP_GAME, stopGame)
  }

  // устанавливает слушатели на кнопки-стрелки
  private addKeyListenters() {
    this.listeners = {} as Game['listeners']
    this.listeners.keydown = this.keyDownCallback.bind(this)
    this.listeners.keyup = this.keyUpCallback.bind(this)
    document.addEventListener('keydown', this.listeners.keydown)
    document.addEventListener('keyup', this.listeners.keyup)
  }

  private removeKeyListenters() {
    document.removeEventListener('keydown', this.listeners.keydown)
    document.removeEventListener('keyup', this.listeners.keyup)
  }

  // при нажатии кнопки влево/вправо
  private keyDownCallback(e: KeyboardEvent) {
    if (this.player.animationId !== 0) {
      return
    }

    if (e.code === KEYS.KEY_F) {
      this.enableToogleFullscreen()
    }

    if (e.key === KEYS.ARROW_LEFT) {
      this.player.moveLeft()
    }

    if (e.key === KEYS.ARROW_RIGHT) {
      this.player.moveRight()
    }
  }

  // при отжатии кнопки влево/вправо
  private keyUpCallback(e: KeyboardEvent) {
    if (e.key === KEYS.ARROW_LEFT) {
      this.player.stop()
    }

    if (e.key === KEYS.ARROW_RIGHT) {
      this.player.stop()
    }
  }

  private stop() {
    this.removeKeyListenters()
    this.isStart = false
    this.player.stop()
    this.enemy.stop()

    this.enemy.rockets.forEach(rocket => {
      rocket.stop()
    })
  }

  private enableToogleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
