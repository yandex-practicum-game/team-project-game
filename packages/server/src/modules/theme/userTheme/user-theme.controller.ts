import UserThemeService from './user-theme.service'

import type { UserTheme } from '@prisma/client'
import type { Request, Response } from 'express'

export default class UserThemeController {
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
    req: Request<unknown, unknown, Omit<UserTheme, 'id'>, unknown>,
    res: Response
  ) {
    try {
      const { userId, ...data } = req.body

      if (!userId) {
        res.status(400).json({ error: 'userId not specified' })
      }

      const userTheme = await UserThemeService.update(userId, data)

      res.status(200).json(userTheme)
    } catch (error) {
      console.error('[Error] UserThemeController update: ', error)
      res.status(500).json({ error: 'Could not update a userTheme' })
    }
  }
}
