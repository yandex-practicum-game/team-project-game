import SiteThemesService from './site-themes.service'

import type { Request, Response } from 'express'
import type { GetSiteThemesQueryParams } from './site-themes.interface'

export default class SiteThemesController {
  static async createInitial() {
    try {
      await SiteThemesService.create()
    } catch (error) {
      console.error('[Error] SiteThemesController create: ', error)
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
