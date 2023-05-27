import prisma from '../prisma'
import type { UserTheme } from '@prisma/client'

export default class UserThemeService {
  static async create(data: Omit<UserTheme, 'id'>) {
    const { themeId, userId } = data

    const userTheme = await prisma.userTheme.create({
      data: {
        theme: { connect: { id: Number(themeId) } },
        userId: userId,
      },
    })

    return userTheme
  }

  static async getOne(id: number) {
    const userThemesSearchRes = await prisma.userTheme.findMany({
      where: {
        userId: id,
      },
    })

    if (userThemesSearchRes.length === 0) {
      return await this.create({ userId: id, themeId: 1 })
    }
    return userThemesSearchRes[0]
  }

  static async update(userId: number, data: Omit<UserTheme, 'id' | 'userId'>) {
    const userTheme = await prisma.userTheme.updateMany({
      where: { userId },
      data,
    })
    return userTheme
  }
}
