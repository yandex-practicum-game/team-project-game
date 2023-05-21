import prisma from '../prisma'

import type { Request, Response } from 'express'

interface Body {
  title: string
}

async function createForum(
  req: Request<unknown, unknown, Body, unknown>,
  res: Response
) {
  const { title } = req.body
  try {
    const forum = await prisma.forum.create({ data: { title } })
    res.status(201).json(forum)
  } catch (error) {
    console.error('[Error] createForum: ', error)
    res.status(500).json({ error: 'Could not create a forums' })
  }
}

export default createForum
