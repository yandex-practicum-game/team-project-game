import prisma from '../prisma'

import type { Forum } from '@prisma/client'
import type { Request, Response } from 'express'
import type { ForumsData, ForumsQueryParams } from './forum.interface'

export default class ForumController {
  static async create(
    req: Request<unknown, unknown, Omit<Forum, 'id'>, unknown>,
    res: Response
  ) {
    try {
      const forum = await prisma.forum.create({
        data: {
          title: req.body.title,
          userId: req.body.userId,
        },
      })
      res.status(201).json(forum)
    } catch (error) {
      console.error('[Error] ForumController create: ', error)
      res.status(500).json({ error: 'Could not create a forums' })
    }
  }

  static async getAll(
    req: Request<unknown, unknown, { userId: string }, ForumsQueryParams>,
    res: Response
  ) {
    const { page = 1, take = 10 } = req.query
    const skip = (Number(page) - 1) * Number(take)

    try {
      const [forums, total] = await Promise.all([
        prisma.$queryRaw<ForumsData[]>`    
          SELECT 
            f."id", f."title",
            COUNT(DISTINCT t."id")::int AS "topicsCount",
            COUNT(DISTINCT c."id")::int AS "commentsCount"
          FROM "Forum" AS f
          LEFT JOIN "Topic" AS t ON t."forumId" = f."id"
          LEFT JOIN "Comment" AS c ON c."topicId" = t."id"
          GROUP BY f."id"
          OFFSET ${skip}
          LIMIT ${Number(take)}
        `,
        prisma.forum.count(),
      ])
      res.status(200).json({ forums, total })
    } catch (error) {
      console.error('[Error] ForumController getAll: ', error)
      res.status(500).json({ error: 'Could not get a forums' })
    }
  }

  static async getOne(
    req: Request<Pick<Forum, 'id'>, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    try {
      const forum = await prisma.forum.findUnique({ where: { id } })
      res.status(200).json(forum)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, Forum, unknown>,
    res: Response
  ) {
    const { id, userId, ...data } = req.body
    try {
      const forum = await prisma.forum.updateMany({
        where: { id, userId },
        data,
      })
      res.status(200).json(forum)
    } catch (error) {
      console.error('[Error] ForumController update: ', error)
      res.status(500).json({ error: 'Could not update a forum' })
    }
  }

  static async delete(
    req: Request<Pick<Forum, 'id'>, unknown, Forum, unknown>,
    res: Response
  ) {
    try {
      const forum = await prisma.forum.deleteMany({
        where: {
          id: Number(req.params.id),
          userId: req.body.userId,
        },
      })
      res.status(200).json(forum)
    } catch (error) {
      console.error('[Error] ForumController delete: ', error)
      res.status(500).json({ error: 'Could not delete a forum' })
    }
  }
}
