import { Player } from './Player'

export class Game {
  static isStart: boolean
  static player: Player
  static ctx: CanvasRenderingContext2D
  static board = {
    w: window.innerWidth,
    h: window.innerHeight,
  }

  public static start(ctx: CanvasRenderingContext2D) {
    // сделано для strict mode, useEffect запускается два раза
    if (Game.isStart) {
      return
    }

    Game.isStart = true
    Game.ctx = ctx

    Game.clearScreen()
    Game.addKeyListenter()

    Game.player = new Player(Game.ctx, Game.board)
  }

  // устанавливает слушатели на кнопки-стрелки
  private static addKeyListenter() {
    addEventListener('keydown', Game.keyDownCallback.bind(this))
    addEventListener('keyup', Game.keyUpCallback.bind(this))
  }

  // очистка экрана
  private static clearScreen() {
    Game.ctx.clearRect(0, 0, Game.board.w, Game.board.h)
  }

  // при нажатии кнопки влево/вправо
  private static keyDownCallback(e: KeyboardEvent) {
    if (Game.player.animationId !== 0) {
      return
    }
    if (e.key === 'ArrowLeft') {
      Game.player.moveLeft()
    }
    if (e.key === 'ArrowRight') {
      Game.player.moveRight()
    }
  }

  // при отжатии кнопки влево/вправо
  private static keyUpCallback(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      Game.player.stop()
    }
    if (e.key === 'ArrowRight') {
      Game.player.stop()
    }
  }
}
