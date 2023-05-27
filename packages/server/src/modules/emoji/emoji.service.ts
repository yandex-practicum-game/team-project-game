import prisma from '../prisma'

export default class EmojiService {
  static async create() {
    const count = await prisma.emoji.count()
    // если нет эмоджи, то создаем
    if (count === 0) {
      await prisma.emoji.createMany({
        data: [
          {
            content: 'asda',
          },
          {
            content: 'asda',
          },
          {
            content: 'asda',
          },
          {
            content: 'asda',
          },
          {
            content: 'asda',
          },
          {
            content: 'asda',
          },
        ],
      })
    }
  }
}
