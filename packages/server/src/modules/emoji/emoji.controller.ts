import EmojiService from './emoji.service'

export default class EmojiController {
  static async init() {
    try {
      await EmojiService.create()
    } catch (error) {
      console.error('[Error] EmojiController create: ', error)
    }
  }
}
