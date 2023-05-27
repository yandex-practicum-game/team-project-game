import SiteThemesService from './site-themes.service'

import type { Request, Response } from 'express'

export default class SiteThemesController {
  static async createInitial() {
    try {
      await SiteThemesService.create()
      console.log('➜ 🎸 Initial themes is set')
    } catch (error) {
      console.error('[Error] SiteThemesController createInitial: ', error)
    }
  }

  static async getAll(
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response
  ) {
    try {
      const [siteThemes, total] = await SiteThemesService.getAll()
      res.status(200).json({ siteThemes, total })
    } catch (error) {
      console.error('[Error] SiteThemesController getAll: ', error)
      res.status(500).json({ error: 'Could not get a topics' })
    }
  }
}
