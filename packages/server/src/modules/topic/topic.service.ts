import prisma from '../prisma'
import type { Topic } from '@prisma/client'

export default class TopicService {
  static async create(data: Omit<Topic, 'id'>) {
    const { title, forumId, userId } = data

    const topic = await prisma.topic.create({
      data: {
        title: title,
        userId: userId,
        forum: { connect: { id: forumId } },
      },
    })

    return topic
  }

  static async getAll(take: string, page: string) {
    const skip = (Number(page) - 1) * Number(take)

    const [topics, total] = await Promise.all([
      prisma.topic.findMany({ skip, take: Number(take) }),
      prisma.topic.count(),
    ])

    return [topics, total]
  }

  static async getOne(id: string) {
    const topic = await prisma.topic.findUnique({
      where: {
        id: Number(id),
      },
    })
    return topic
  }

  static async update(
    id: number,
    userId: number,
    data: Omit<Topic, 'id' | 'userId'>
  ) {
    const topic = await prisma.topic.updateMany({
      where: { id, userId },
      data,
    })
    return topic
  }

  static async delete(id: string, userId: number) {
    const topic = await prisma.topic.deleteMany({
      where: {
        id: Number(id),
        userId: userId,
      },
    })
    return topic
  }
}
