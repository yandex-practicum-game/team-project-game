import UserThemeService from './user-theme.service'

import type { UserTheme } from '@prisma/client'
import type { Request, Response } from 'express'

export default class UserThemeController {
  static async create(
    req: Request<unknown, unknown, Omit<UserTheme, 'id'>, unknown>,
    res: Response
  ) {
    try {
      const userTheme = await UserThemeService.create(req.body)

      res.status(201).json(userTheme)
    } catch (error) {
      console.error('[Error] UserThemeController create: ', error)
      res.status(500).json({ error: 'Could not create a userTheme' })
    }
  }

  static async getOneByUser(
    req: Request<unknown, unknown, UserTheme, unknown>,
    res: Response
  ) {
    try {
      const { userId } = req.body
      if (!userId) {
        res.status(400).json({ error: 'userId not specified' })
      }
      const userTheme = await UserThemeService.getOne(userId)
      res.status(200).json(userTheme)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, UserTheme, unknown>,
    res: Response
  ) {
    try {
      const { id, userId, ...data } = req.body

      if (!id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const userTheme = await UserThemeService.update(Number(id), userId, data)

      res.status(200).json(userTheme)
    } catch (error) {
      console.error('[Error] UserThemeController update: ', error)
      res.status(500).json({ error: 'Could not update a userTheme' })
    }
  }

  static async delete(
    req: Request<{ id: string }, unknown, UserTheme, unknown>,
    res: Response
  ) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const userTheme = await UserThemeService.delete(
        req.params.id,
        req.body.userId
      )

      res.status(200).json(userTheme)
    } catch (error) {
      console.error('[Error] UserThemeController delete: ', error)
      res.status(500).json({ error: 'Could not delete a userTheme' })
    }
  }
}
