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
    const userTheme = await prisma.userTheme.findMany({
      where: {
        userId: id,
      },
    })
    return userTheme
  }

  static async update(
    id: number,
    userId: number,
    data: Omit<UserTheme, 'id' | 'userId'>
  ) {
    const userTheme = await prisma.userTheme.updateMany({
      where: { id, userId },
      data,
    })
    return userTheme
  }

  static async delete(id: string, userId: number) {
    const userTheme = await prisma.userTheme.deleteMany({
      where: {
        id: Number(id),
        userId: userId,
      },
    })
    return userTheme
  }
}
