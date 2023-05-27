import { Router } from 'express'
import UserThemeController from './user-theme.controller'
import authMiddleware from '../middlewares/auth.middleware'

const routerUserTheme = Router()

routerUserTheme.use(authMiddleware)

routerUserTheme.get('/user-theme', UserThemeController.getOneByUser)
routerUserTheme.put('/user-theme', UserThemeController.update)

export default routerUserTheme
