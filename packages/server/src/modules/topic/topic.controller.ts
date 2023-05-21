import prisma from '../prisma'

import type { Topic } from '@prisma/client'
import type { Request, Response } from 'express'
import type { GetTopicsQueryParams } from './topic.interface'

export default class TopicController {
  static async create(
    req: Request<unknown, unknown, Omit<Topic, 'id'>, unknown>,
    res: Response
  ) {
    const { title, forumId } = req.body
    try {
      const topic = await prisma.topic.create({
        data: {
          title: title,
          forum: { connect: { id: forumId } },
        },
      })
      res.status(201).json(topic)
    } catch (error) {
      console.error('[Error] TopicController create: ', error)
      res.status(500).json({ error: 'Could not create a topics' })
    }
  }

  static async getAll(
    req: Request<unknown, unknown, unknown, GetTopicsQueryParams>,
    res: Response
  ) {
    const { page = 1, take = 10 } = req.query
    const skip = (page - 1) * take

    try {
      const [topics, total] = await Promise.all([
        prisma.topic.findMany({ skip, take }),
        prisma.topic.count(),
      ])

      res.status(200).json({ topics, total })
    } catch (error) {
      console.error('[Error] TopicController getAll: ', error)
      res.status(500).json({ error: 'Could not get a topics' })
    }
  }

  static async getOne(
    req: Request<Pick<Topic, 'id'>, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    try {
      const topic = await prisma.topic.findUnique({ where: { id } })
      res.status(200).json(topic)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, Topic, unknown>,
    res: Response
  ) {
    const { id, ...data } = req.body
    try {
      const topic = await prisma.topic.update({ where: { id }, data })
      res.status(200).json(topic)
    } catch (error) {
      console.error('[Error] TopicController update: ', error)
      res.status(500).json({ error: 'Could not update a topic' })
    }
  }

  static async delete(
    req: Request<Pick<Topic, 'id'>, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    try {
      const topic = await prisma.topic.delete({ where: { id } })
      res.status(200).json(topic)
    } catch (error) {
      console.error('[Error] TopicController delete: ', error)
      res.status(500).json({ error: 'Could not delete a topic' })
    }
  }
}
