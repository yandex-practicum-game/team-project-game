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
    req: Request<unknown, unknown, unknown, GetSiteThemesQueryParams>,
    res: Response
  ) {
    try {
      const { page = '1', take = '10' } = req.query
      const [siteThemes, total] = await SiteThemesService.getAll(take, page)
      res.status(200).json({ siteThemes, total })
    } catch (error) {
      console.error('[Error] SiteThemesController getAll: ', error)
      res.status(500).json({ error: 'Could not get a topics' })
    }
  }
}
