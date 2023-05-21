import prisma from '../prisma'

import type { Request, Response } from 'express'

interface QueryParams {
  page?: number
  take?: number
  forumId: number
}

async function getTopics(
  req: Request<unknown, unknown, unknown, QueryParams>,
  res: Response
) {
  const { page = 1, take = 10, forumId } = req.query
  const skip = (page - 1) * take

  try {
    const [topics, total] = await Promise.all([
      prisma.topic.findMany({ where: { forumId }, skip, take }),
      prisma.topic.count(),
    ])

    res.status(200).json({ topics, total })
  } catch (error) {
    console.error('[Error] getTopics: ', error)
    res.status(500).json({ error: 'Could not get a topics' })
  }
}

export default getTopics
