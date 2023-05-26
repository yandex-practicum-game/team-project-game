import { Router } from 'express'
import UserThemeController from './user-theme.controller'
import authMiddleware from '../middlewares/auth.middleware'

const routerUserTheme = Router()

routerUserTheme.use(authMiddleware)

routerUserTheme.post('/user-theme', UserThemeController.create)
routerUserTheme.get('/user-theme', UserThemeController.getOneByUser)
routerUserTheme.put('/user-theme', UserThemeController.update)
routerUserTheme.delete('/user-theme/:id', UserThemeController.delete)

export default routerUserTheme
