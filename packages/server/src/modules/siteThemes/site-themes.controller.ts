import SiteThemesService from './site-themes.service'

import type { SiteThemes } from '@prisma/client'
import type { Request, Response } from 'express'
import type { GetSiteThemesQueryParams } from './site-themes.interface'

export default class SiteThemesController {
  static async create(
    req: Request<unknown, unknown, Omit<SiteThemes, 'id'>, unknown>,
    res: Response
  ) {
    console.log(req, 1, res)
    try {
      const siteThemes = await SiteThemesService.create(req.body)

      res.status(201).json(siteThemes)
    } catch (error) {
      console.error('[Error] SiteThemesController create: ', error)
      res.status(500).json({ error: 'Could not create a topics' })
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

  static async getOne(
    req: Request<{ id: string }, unknown, unknown, unknown>,
    res: Response
  ) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Id not specified' })
      }
      const siteTheme = await SiteThemesService.getOne(req.params.id)
      res.status(200).json(siteTheme)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async update(
    req: Request<unknown, unknown, SiteThemes, unknown>,
    res: Response
  ) {
    try {
      const { id, ...data } = req.body

      if (!id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const siteThemes = await SiteThemesService.update(id, data)

      res.status(200).json(siteThemes)
    } catch (error) {
      console.error('[Error] SiteThemesController update: ', error)
      res.status(500).json({ error: 'Could not update a topic' })
    }
  }

  static async delete(
    req: Request<{ id: string }, unknown, SiteThemes, unknown>,
    res: Response
  ) {
    try {
      if (!req.params.id) {
        res.status(400).json({ error: 'Id not specified' })
      }

      const siteThemes = await SiteThemesService.delete(req.params.id)

      res.status(200).json(siteThemes)
    } catch (error) {
      console.error('[Error] SiteThemesController delete: ', error)
      res.status(500).json({ error: 'Could not delete a theme' })
    }
  }
}
