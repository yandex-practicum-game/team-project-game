import prisma from '../prisma'

import type { Request, Response } from 'express'

interface QueryParams {
  page?: number
  take?: number
}

async function getForums(
  req: Request<unknown, unknown, unknown, QueryParams>,
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
    console.error('[Error] getForums: ', error)
    res.status(500).json({ error: 'Could not get a forums' })
  }
}

export default getForums
