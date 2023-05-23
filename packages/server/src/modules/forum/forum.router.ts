import { Router } from 'express'

import ForumController from './forum.controller'
import authMiddleware from '../middlewares/auth.middleware'

const routerForum = Router()

routerForum.use(authMiddleware)

routerForum.post('/forums', ForumController.create)
routerForum.get('/forums', ForumController.getAll)
routerForum.get('/forums/:id', ForumController.getOne)
routerForum.put('/forums', ForumController.update)
routerForum.delete('/forums/:id', ForumController.delete)

export default routerForum
