import prisma from '../prisma'

import type { Forum } from '@prisma/client'
import type { Request, Response } from 'express'
import type { GetForumsQueryParams } from './forum.interface'

export class ForumController {
  static async create(
    req: Request<unknown, unknown, Omit<Forum, 'id'>, unknown>,
    res: Response
  ) {
    const { title } = req.body
    try {
      const forum = await prisma.forum.create({ data: { title } })
      res.status(201).json(forum)
    } catch (error) {
      console.error('[Error] ForumController create: ', error)
      res.status(500).json({ error: 'Could not create a forums' })
    }
  }

  static async getAll(
    req: Request<unknown, unknown, unknown, GetForumsQueryParams>,
    res: Response
  ) {
    const { page = 1, take = 10 } = req.query
    const skip = (page - 1) * take

    try {
      const [forums, total] = await Promise.all([
        prisma.forum.findMany({ skip, take }),
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
    const { id, ...data } = req.body
    try {
      const forum = await prisma.forum.update({ where: { id }, data })
      res.status(200).json(forum)
    } catch (error) {
      console.error('[Error] ForumController update: ', error)
      res.status(500).json({ error: 'Could not update a forum' })
    }
  }

  static async delete(
    req: Request<Pick<Forum, 'id'>, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    try {
      const forum = await prisma.forum.delete({ where: { id } })
      res.status(200).json(forum)
    } catch (error) {
      console.error('[Error] ForumController delete: ', error)
      res.status(500).json({ error: 'Could not delete a forum' })
    }
  }
}
