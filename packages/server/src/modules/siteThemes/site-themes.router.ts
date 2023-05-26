import { Router } from 'express'
import SiteThemesController from './site-themes.controller'

const routerSiteThemes = Router()

routerSiteThemes.post('/site-themes', SiteThemesController.create)
routerSiteThemes.get('/site-themes/:id', SiteThemesController.getOne)
routerSiteThemes.get('/site-themes', SiteThemesController.getAll)
routerSiteThemes.put('/site-themes/:id', SiteThemesController.update)
routerSiteThemes.delete('/site-themes/:id', SiteThemesController.delete)

export default routerSiteThemes
