import { KEYS } from '../../../constants/keys'
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
    w: window.innerWidth,
    h: window.innerHeight,
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
    this.addKeyListenter()

    // подписываемся на стоп игру
    const stopGame = () => {
      this.stop()
      this.emitter.off(EVENTS.STOP_GAME, stopGame)
    }

    this.emitter.on(EVENTS.STOP_GAME, stopGame)
  }

  // устанавливает слушатели на кнопки-стрелки
  private addKeyListenter() {
    document.addEventListener('keydown', this.keyDownCallback.bind(this))
    document.addEventListener('keyup', this.keyUpCallback.bind(this))
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
    this.isStart = false
    this.player.stop()
    this.enemy.stop()

    this.enemy.rockets.forEach(rocket => {
      rocket.stop()
    })
  }
}
