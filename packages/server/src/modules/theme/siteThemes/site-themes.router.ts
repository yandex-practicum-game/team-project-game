import { Router } from 'express'
import SiteThemesController from './site-themes.controller'

const routerSiteThemes = Router()

routerSiteThemes.get('/site-themes', SiteThemesController.getAll)

export default routerSiteThemes
