import prisma from '../../prisma'
import type { Request, Response } from 'express'

async function testController(req: Request, res: Response) {
  try {
    const count = await prisma.testEntity.count()

    if (count === 0) {
      await prisma.testEntity.create({ data: { name: 'Test name' } })
    }

    const testEntity = await prisma.testEntity.findFirst()

    if (!testEntity) {
      res.status(404).json({ result: 'not ok', name: null })
      return
    }

    res.status(200).json({ result: 'ok', name: testEntity.name })
  } catch (error) {
    console.log('error:', error)
    res.status(500).json({ result: 'not ok', error: error })
  }
}

export default testController
