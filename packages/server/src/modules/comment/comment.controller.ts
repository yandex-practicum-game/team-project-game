import CommentService from './comment.service'
import type { Comment } from '@prisma/client'
import type { Request, Response } from 'express'
import type { GetCommentsQueryParams } from './comment.interface'

export default class CommentController {
  static async create(
    req: Request<unknown, unknown, Omit<Required<Comment>, 'id'>, unknown>,
    res: Response
  ) {
    try {
      const result = await CommentService.create(req.body)

      if (typeof result === 'string') {
        res.status(400).json({ error: result })
        return
      }

      res.status(201).json(result)
    } catch (error) {
      console.error('[Error] CommentController create: ', error)
      res.status(500).json({ error: 'Could not create a comments' })
    }
  }

  static async getAll(
    req: Request<{ topicId: string }, unknown, unknown, GetCommentsQueryParams>,
    res: Response
  ) {
    try {
      const { page = '1', take = '10' } = req.query
      const { topicId } = req.params
      const [comments, total] = await CommentService.getAll(topicId, take, page)

      res.status(200).json({ comments, total })
    } catch (error) {
      console.error('[Error] CommentController getAll: ', error)
      res.status(500).json({ error: 'Could not get a comments' })
    }
  }

  static async getOne(
    req: Request<{ id: string }, unknown, unknown, unknown>,
    res: Response
  ) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Id not specified' })
      }
      const comment = await CommentService.getOne(req.params.id)
      res.status(200).json(comment)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, Comment, unknown>,
    res: Response
  ) {
    try {
      const { id, userId, ...data } = req.body

      if (!id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const comment = await CommentService.update(id, userId, data)

      res.status(200).json(comment)
    } catch (error) {
      console.error('[Error] CommentController update: ', error)
      res.status(500).json({ error: 'Could not update a comment' })
    }
  }

  static async delete(
    req: Request<{ id: string }, unknown, Comment, unknown>,
    res: Response
  ) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const comment = await CommentService.delete(
        req.params.id,
        req.body.userId
      )

      res.status(200).json(comment)
    } catch (error) {
      console.error('[Error] CommentController delete: ', error)
      res.status(500).json({ error: 'Could not delete a comment' })
    }
  }
}
