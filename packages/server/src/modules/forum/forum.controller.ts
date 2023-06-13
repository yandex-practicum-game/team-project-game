import ForumService from './forum.service'
import type { Forum } from '@prisma/client'
import type { Request, Response } from 'express'
import type { ForumsQueryParams } from './forum.interface'

export default class ForumController {
  static async create(
    req: Request<unknown, unknown, Omit<Forum, 'id'>, unknown>,
    res: Response
  ) {
    try {
      const forum = await ForumService.create(req.body.title, req.body.userId)
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
    try {
      const { page = '1', take = '10' } = req.query
      const [forums, total] = await ForumService.getAll(take, page)
      res.status(200).json({ forums, total })
    } catch (error) {
      console.error('[Error] ForumController getAll: ', error)
      res.status(500).json({ error: 'Could not get a forums' })
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
      const forum = await ForumService.getOne(req.params.id)
      res.status(200).json(forum)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, Forum, unknown>,
    res: Response
  ) {
    try {
      const { id, userId, ...data } = req.body

      if (!id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const forum = await ForumService.update(id, userId, data)

      res.status(200).json(forum)
    } catch (error) {
      console.error('[Error] ForumController update: ', error)
      res.status(500).json({ error: 'Could not update a forum' })
    }
  }

  static async delete(
    req: Request<{ id: string }, unknown, Forum, unknown>,
    res: Response
  ) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Id not specified' })
      }
      const forum = await ForumService.delete(req.params.id, req.body.userId)
      res.status(200).json(forum)
    } catch (error) {
      console.error('[Error] ForumController delete: ', error)
      res.status(500).json({ error: 'Could not delete a forum' })
    }
  }
}
