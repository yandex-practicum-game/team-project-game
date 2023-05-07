import { Enemy } from './Enemy'
import rocketImage from './images/rocket.png'

export class Rocket {
  private animationId = 0
  private image = new Image()
  private speed = 4

  public x = 0
  public y = 0
  public w = 12
  public h = 32

  constructor(
    private ctx: CanvasRenderingContext2D,
    private board: {
      width: number
      height: number
    },
    private owner: Enemy,
    private startX: number
  ) {}

  // отрисовка и запуск ракеты
  init() {
    this.renderRocket()
    this.launch()
    return this
  }

  // отрисовка ракеты
  renderRocket() {
    this.setStartPoint()

    this.image.src = rocketImage
    this.image.onload = () => {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    }
  }

  // установка ракеты на начальное место запуска
  setStartPoint() {
    this.x = this.owner.x + this.startX
    this.y = 250
  }

  // запуск ракеты
  launch() {
    if (this.y > this.board.height + 5) {
      this.setStartPoint()
    }

    this.ctx.clearRect(this.x, this.y - this.speed, this.w, this.h)
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    this.y += this.speed

    this.animationId = window.requestAnimationFrame(() => {
      this.launch()
    })
  }

  // остановка ракеты
  stop() {
    window.cancelAnimationFrame(this.animationId)
    this.animationId = 0
  }
}
