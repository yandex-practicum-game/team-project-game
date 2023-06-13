import prisma from '../prisma'
import getForumData from './queries/getForumData'
import type { Forum } from '@prisma/client'

export default class ForumService {
  static async create(title: string, userId: number) {
    const forum = await prisma.forum.create({ data: { title, userId } })
    return forum
  }

  static async getAll(take: string, page: string) {
    const skip = (Number(page) - 1) * Number(take)

    const [forums, total] = await Promise.all([
      getForumData(skip, Number(take)),
      prisma.forum.count(),
    ])

    return [forums, total]
  }

  static async getOne(id: string) {
    const forum = await prisma.forum.findUnique({
      where: {
        id: Number(id),
      },
    })
    return forum
  }

  static async update(
    id: number,
    userId: number,
    data: Omit<Forum, 'id' | 'userId'>
  ) {
    const forum = await prisma.forum.updateMany({
      where: { id, userId },
      data,
    })
    return forum
  }

  static async delete(id: string, userId: number) {
    const forum = await prisma.forum.deleteMany({
      where: {
        id: Number(id),
        userId: userId,
      },
    })
    return forum
  }
}
