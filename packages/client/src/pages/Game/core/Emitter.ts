type Callback = (...args: unknown[]) => void

export class Emitter {
  private listeners: Record<string, Callback[]> = {}
  private static instance: Emitter

  public static getInstance(): Emitter {
    if (!Emitter.instance) {
      Emitter.instance = new Emitter()
    }

    return Emitter.instance
  }

  on(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(listener => {
      if (listener !== callback) {
        return true
      }
      return false
    })
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
}
