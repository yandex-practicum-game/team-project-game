import prisma from '../prisma'

import type { Request, Response } from 'express'

interface Body {
  content: string
  owner: string
  parentId: number
}

async function createComment(
  req: Request<unknown, unknown, Body, unknown>,
  res: Response
) {
  const { content, owner, parentId } = req.body
  try {
    const comment = await prisma.comment.create({
      data: {
        content: content,
        owner: owner,
        parent: parentId ? { connect: { id: parentId } } : undefined,
      },
    })
    res.status(201).json(comment)
  } catch (error) {
    console.error('[Error] createComment: ', error)
    res.status(500).json({ error: 'Could not create a comment' })
  }
}

export default createComment
