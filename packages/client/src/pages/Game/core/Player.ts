import playerImage from './images/player.png'

export class Player {
  private image = new Image()
  private speed = 4.5

  public animationId = 0
  public x = 0
  public y = 0
  public w = 60
  public h = 60

  constructor(
    private ctx: CanvasRenderingContext2D,
    private board: {
      width: number
      height: number
    }
  ) {
    this.renderPlayer()
  }

  renderPlayer() {
    this.x = this.board.width / 2 - this.w / 2
    this.y = this.board.height - 100

    this.image.src = playerImage
    this.image.onload = () => {
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
    }
  }

  moveLeft() {
    if (this.isLeftEdgeScreen()) {
      this.stop()
      return
    }

    this.ctx.clearRect(this.x, this.y, this.w + this.speed, this.h)
    this.ctx.drawImage(this.image, this.x - this.speed, this.y, this.w, this.h)
    this.x -= this.speed

    this.animationId = window.requestAnimationFrame(() => {
      this.moveLeft()
    })
  }

  moveRight() {
    if (this.isRightEdgeScreen()) {
      this.stop()
      return
    }

    this.ctx.clearRect(this.x, this.y, this.w - this.speed, this.h)
    this.ctx.drawImage(this.image, this.x + this.speed, this.y, this.w, this.h)
    this.x += this.speed

    this.animationId = window.requestAnimationFrame(() => {
      this.moveRight()
    })
  }

  stop() {
    window.cancelAnimationFrame(this.animationId)
    this.animationId = 0
  }

  // проверка на левый край экрана
  isLeftEdgeScreen() {
    if (this.x <= 0) {
      return true
    }
  }

  // проверка на правый край экрана
  isRightEdgeScreen() {
    if (this.x >= this.board.width - this.w) {
      return true
    }
  }
}
