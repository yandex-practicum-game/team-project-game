import prisma from '../prisma'

import type { Request, Response } from 'express'

interface Body {
  title: string
  forumId: number
}

async function createTopic(
  req: Request<unknown, unknown, Body, unknown>,
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
    console.error('[Error] createTopic: ', error)
    res.status(500).json({ error: 'Could not create a topic' })
  }
}

export default createTopic
