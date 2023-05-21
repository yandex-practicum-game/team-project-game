import prisma from '../prisma'
import buildCommentTree from './utils/buildCommentTree'

import type { Comment } from '@prisma/client'
import type { Request, Response } from 'express'
import type { GetCommentsQueryParams } from './comment.interface'

export default class CommentController {
  static async create(
    req: Request<unknown, unknown, Omit<Required<Comment>, 'id'>, unknown>,
    res: Response
  ) {
    const { content, owner, parentId, topicId } = req.body

    try {
      if (!parentId) {
        const comment = await prisma.comment.create({
          data: {
            topic: { connect: { id: topicId } },
            content: content,
            owner: owner,
          },
        })
        res.status(201).json(comment)
        return
      }

      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
        select: { topicId: true },
      })

      if (!parentComment) {
        res.status(400).json({ error: 'Parent comment does not exist' })
        return
      }

      const comment = await prisma.comment.create({
        data: {
          topic: { connect: { id: parentComment?.topicId } },
          content: content,
          owner: owner,
          parent: { connect: { id: parentId } },
        },
      })

      res.status(201).json(comment)
    } catch (error) {
      console.error('[Error] CommentController create: ', error)
      res.status(500).json({ error: 'Could not create a comments' })
    }
  }

  static async getAll(
    req: Request<unknown, unknown, unknown, GetCommentsQueryParams>,
    res: Response
  ) {
    const { page = 1, take = 10 } = req.query
    const skip = (page - 1) * take

    try {
      const [comments, total] = await Promise.all([
        prisma.comment.findMany({ skip, take }),
        prisma.comment.count(),
      ])

      const tree = buildCommentTree(comments)

      res.status(200).json({ comments, tree, total })
    } catch (error) {
      console.error('[Error] CommentController getAll: ', error)
      res.status(500).json({ error: 'Could not get a comments' })
    }
  }

  static async getOne(
    req: Request<Pick<Comment, 'id'>, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    try {
      const comment = await prisma.comment.findUnique({ where: { id } })
      res.status(200).json(comment)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, Comment, unknown>,
    res: Response
  ) {
    const { id, ...data } = req.body
    try {
      const comment = await prisma.comment.update({ where: { id }, data })
      res.status(200).json(comment)
    } catch (error) {
      console.error('[Error] CommentController update: ', error)
      res.status(500).json({ error: 'Could not update a comment' })
    }
  }

  static async delete(
    req: Request<Pick<Comment, 'id'>, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    try {
      const comment = await prisma.comment.delete({ where: { id } })
      res.status(200).json(comment)
    } catch (error) {
      console.error('[Error] CommentController delete: ', error)
      res.status(500).json({ error: 'Could not delete a comment' })
    }
  }
}
