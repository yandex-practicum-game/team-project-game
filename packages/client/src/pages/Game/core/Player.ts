import playerImage from './images/player.png'

export class Player {
  public animationId = 0
  private target = new Image()
  private speed = 3.5
  private x = 0
  private y = 0
  private w = 60
  private h = 60

  constructor(
    private ctx: CanvasRenderingContext2D,
    private board: {
      w: number
      h: number
    }
  ) {
    this.renderPlayer()
  }

  renderPlayer() {
    this.x = this.board.w / 2 - this.w / 2
    this.y = this.board.h - 100

    this.target.src = playerImage
    this.target.onload = () => {
      this.ctx.drawImage(this.target, this.x, this.y, this.w, this.h)
    }
  }

  moveLeft() {
    if (this.isLeftEdgeScreen()) {
      this.stop()
      return
    }

    this.ctx.clearRect(this.x, this.y, this.w + this.speed, this.h)
    this.ctx.drawImage(this.target, this.x - this.speed, this.y, this.w, this.h)
    this.x -= this.speed
    this.animationId = requestAnimationFrame(() => {
      this.moveLeft()
    })
  }

  moveRight() {
    if (this.isRightEdgeScreen()) {
      this.stop()
      return
    }

    this.ctx.clearRect(this.x, this.y, this.w - this.speed, this.h)
    this.ctx.drawImage(this.target, this.x + this.speed, this.y, this.w, this.h)
    this.x += this.speed
    this.animationId = requestAnimationFrame(() => {
      this.moveRight()
    })
  }

  stop() {
    cancelAnimationFrame(this.animationId)
    this.animationId = 0
  }

  //проверка на левый край экрана
  isLeftEdgeScreen() {
    if (this.x <= 0) {
      return true
    }
  }

  //проверка на правый край экрана
  isRightEdgeScreen() {
    if (this.x >= this.board.w - this.w) {
      return true
    }
  }
}
