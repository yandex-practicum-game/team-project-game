import { KEYS } from '../../../constants/keys'
import { Player } from './Player'

export class Game {
  private static instance: Game
  private player: Player
  private board = {
    w: window.innerWidth,
    h: window.innerHeight,
  }

  private constructor(private ctx: CanvasRenderingContext2D) {
    this.player = new Player(this.ctx, this.board)
    this.clearScreen()
    this.addKeyListenter()
  }

  public static start(ctx: CanvasRenderingContext2D) {
    if (!Game.instance) {
      Game.instance = new Game(ctx)
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
}
