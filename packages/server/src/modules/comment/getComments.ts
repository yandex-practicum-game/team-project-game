import prisma from '../prisma'

import type { Request, Response } from 'express'

interface QueryParams {
  page?: number
  take?: number
}

async function getComments(
  req: Request<unknown, unknown, unknown, QueryParams>,
  res: Response
) {
  const { page = 1, take = 10 } = req.query
  const skip = (page - 1) * take

  try {
    const [comments, total] = await Promise.all([
      prisma.comment.findMany({ skip, take }),
      prisma.comment.count(),
    ])

    res.status(200).json({ comments, total })
  } catch (error) {
    console.error('[Error] getComments: ', error)
    res.status(500).json({ error: 'Could not get a comment' })
  }
}

export default getComments
