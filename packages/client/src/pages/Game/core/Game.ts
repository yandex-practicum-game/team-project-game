import { KEYS } from '../../../constants/keys'
import { Emitter } from './Emitter'
import { Enemy } from './Enemy'
import { EVENTS } from './Events'
import { Player } from './Player'

export class Game {
  private static instance: Game
  private player: Player
  private enemy: Enemy
  private board = {
    w: window.innerWidth,
    h: window.innerHeight,
  }

  private constructor(
    private ctx: CanvasRenderingContext2D,
    private emitter: Emitter
  ) {
    this.player = new Player(this.ctx, this.board)
    this.enemy = new Enemy(this.emitter, this.ctx, this.player, this.board)

    this.clearScreen()
    this.addKeyListenter()

    this.emitter.on(EVENTS.STOP_GAME, this.stop.bind(this))
  }

  public static start(ctx: CanvasRenderingContext2D, emitter: Emitter) {
    if (!Game.instance) {
      Game.instance = new Game(ctx, emitter)
    }

    return Game.instance
  }

  // устанавливает слушатели на кнопки-стрелки
  private addKeyListenter() {
    document.addEventListener('keydown', this.keyDownCallback.bind(this))
    document.addEventListener('keyup', this.keyUpCallback.bind(this))
  }

  // очистка экрана
  private clearScreen() {
    this.ctx.clearRect(0, 0, this.board.w, this.board.h)
  }

  // при нажатии кнопки влево/вправо
  private keyDownCallback(e: KeyboardEvent) {
    if (this.player.animationId !== 0) {
      return
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
    this.emitter.off(EVENTS.STOP_GAME, this.stop.bind(this))

    this.player.stop()
    this.enemy.stop()

    this.enemy.rockets.forEach(rocket => {
      rocket.stop()
    })
  }
}
