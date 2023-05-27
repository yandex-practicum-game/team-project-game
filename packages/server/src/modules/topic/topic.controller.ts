import TopicService from './topic.service'

import type { Topic } from '@prisma/client'
import type { Request, Response } from 'express'
import type { GetTopicsQueryParams } from './topic.interface'

export default class TopicController {
  static async create(
    req: Request<unknown, unknown, Omit<Topic, 'id'>, unknown>,
    res: Response
  ) {
    try {
      const topic = await TopicService.create(req.body)

      res.status(201).json(topic)
    } catch (error) {
      console.error('[Error] TopicController create: ', error)
      res.status(500).json({ error: 'Could not create a topics' })
    }
  }

  static async getAll(
    req: Request<{ id: string }, unknown, unknown, GetTopicsQueryParams>,
    res: Response
  ) {
    try {
      const { page = '1', take = '10' } = req.query
      const { id: forumId } = req.params

      const [topics, total] = await TopicService.getAll(forumId, take, page)
      res.status(200).json({ topics, total })
    } catch (error) {
      console.error('[Error] TopicController getAll: ', error)
      res.status(500).json({ error: 'Could not get a topics' })
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
      const topic = await TopicService.getOne(req.params.id)
      res.status(200).json(topic)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, Topic, unknown>,
    res: Response
  ) {
    try {
      const { id, userId, ...data } = req.body

      if (!id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const topic = await TopicService.update(id, userId, data)

      res.status(200).json(topic)
    } catch (error) {
      console.error('[Error] TopicController update: ', error)
      res.status(500).json({ error: 'Could not update a topic' })
    }
  }

  static async delete(
    req: Request<{ id: string }, unknown, Topic, unknown>,
    res: Response
  ) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const topic = await TopicService.delete(req.params.id, req.body.userId)

      res.status(200).json(topic)
    } catch (error) {
      console.error('[Error] TopicController delete: ', error)
      res.status(500).json({ error: 'Could not delete a topic' })
    }
  }
}
