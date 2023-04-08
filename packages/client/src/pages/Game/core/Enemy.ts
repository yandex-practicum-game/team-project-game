import enemyImage from './images/enemy.png'

import { Emitter } from './Emitter'
import { EVENTS } from './Events'
import { Player } from './Player'
import { Rocket } from './Rocket'
import { delay } from './utils/delay'

export class Enemy {
  private animationId = 0
  private image = new Image()
  private speed = 4

  public rockets: Rocket[] = []
  public x = 0
  public y = 0
  public w = 550
  public h = 225

  constructor(
    private emitter: Emitter,
    private ctx: CanvasRenderingContext2D,
    private player: Player,
    private board: {
      w: number
      h: number
    }
  ) {
    this.renderEnemy() // рисуем противника
    this.loadShells() // заряжаем и запускам ракеты
    this.moveRight() // начинаем движение
  }

  // отрисовка противника
  renderEnemy() {
    this.x = this.board.w / 2 - 275
    this.y = 30

    this.image.src = enemyImage
    this.image.onload = () => {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    }
  }

  moveLeft() {
    // проверка на попадание
    if (this.isHit()) {
      this.emitter.emit(EVENTS.STOP_GAME)
      return
    }

    // проверка на конец экаран
    if (this.isLeftEdgeScreen()) {
      this.stop()
      this.moveRight()
      return
    }

    this.ctx.clearRect(this.x, this.y, this.w, this.h)
    this.ctx.drawImage(this.image, this.x - this.speed, this.y, this.w, this.h)
    this.x -= this.speed

    this.animationId = window.requestAnimationFrame(() => {
      this.moveLeft()
    })
  }

  moveRight() {
    // проверка на попадание
    if (this.isHit()) {
      this.emitter.emit(EVENTS.STOP_GAME)
      return
    }

    // проверка на конец экрана
    if (this.isRightEdgeScreen()) {
      this.stop()
      this.moveLeft()
      return
    }

    this.ctx.clearRect(this.x, this.y, this.w, this.h)
    this.ctx.drawImage(this.image, this.x + this.speed, this.y, this.w, this.h)
    this.x += this.speed

    this.animationId = window.requestAnimationFrame(() => {
      this.moveRight()
    })
  }

  // остановка противника
  stop() {
    window.cancelAnimationFrame(this.animationId)
    this.animationId = 0
  }

  // инициализация ракет у противника
  async loadShells() {
    // коородинаты откуда летят ракеты по оси X
    const startXs = [450, 265, 80, 100, 350, 400]

    for (let i = 0; i < startXs.length; i++) {
      // делаем задерждку что бы было растояния по оси Y
      await delay(1000)
      // если игра не остановлена то запускаем ракету
      if (this.animationId !== 0) {
        const rocket = new Rocket(this.ctx, this.board, this, startXs[i]).init()
        this.rockets.push(rocket)
      }
    }
  }

  // проверка на попадание
  isHit() {
    const player = this.player
    const rockets = this.rockets

    for (let i = 0; i < rockets.length; i++) {
      if (rockets[i].x > player.x && rockets[i].x < player.x + player.w) {
        if (rockets[i].y > player.y) {
          return true
        }
      }
    }
  }

  // проверка на левый край экрана
  isLeftEdgeScreen() {
    if (this.x <= 0) {
      return true
    }
  }

  // проверка на правый край экрана
  isRightEdgeScreen() {
    if (this.x >= this.board.w - this.w) {
      return true
    }
  }
}
