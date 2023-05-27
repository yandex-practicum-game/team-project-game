import prisma from '../prisma'
import buildCommentTree from './utils/buildCommentTree'
import type { Comment } from '@prisma/client'

export default class CommentService {
  static async create(data: Omit<Required<Comment>, 'id'>) {
    const { content, userId, parentId, topicId } = data

    if (!parentId) {
      const comment = await prisma.comment.create({
        data: {
          topic: { connect: { id: topicId } },
          content: content,
          userId: userId,
        },
      })

      return comment
    }

    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
      select: { topicId: true },
    })

    if (!parentComment) {
      return 'Parent comment does not exist'
    }

    const comment = await prisma.comment.create({
      data: {
        topic: { connect: { id: parentComment?.topicId } },
        content: content,
        userId: userId,
        parent: { connect: { id: parentId } },
      },
    })

    return comment
  }

  static async getAll(topicId: string, take: string, page: string) {
    const skip = (Number(page) - 1) * Number(take)

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        skip,
        take: Number(take),
        where: { topicId: Number(topicId) },
      }),
      prisma.comment.count({
        where: { topicId: Number(topicId) },
      }),
    ])

    const commentsTree = buildCommentTree(comments)

    return [commentsTree, total]
  }

  static async getOne(id: string) {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    })
    return comment
  }

  static async update(
    id: number,
    userId: number,
    data: Omit<Comment, 'id' | 'userId'>
  ) {
    const comment = await prisma.comment.updateMany({
      where: { id, userId },
      data,
    })
    return comment
  }

  static async delete(id: string, userId: number) {
    const comment = await prisma.comment.deleteMany({
      where: {
        id: Number(id),
        userId: userId,
      },
    })
    return comment
  }
}
