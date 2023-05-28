import prisma from '../prisma'

const EMOJI_LIST = [
  {
    content: '👌',
  },
  {
    content: '👈',
  },
  {
    content: '😏',
  },
  {
    content: '🥸',
  },
  {
    content: '🤪',
  },
  {
    content: '🥶',
  },
]

export default class EmojiService {
  static async create() {
    const count = await prisma.emoji.count()
    // если нет эмоджи, то создаем
    if (count !== 0) {
      return
    }

    const emojiList = await prisma.emoji.createMany({
      data: EMOJI_LIST,
    })

    return emojiList
  }
}
