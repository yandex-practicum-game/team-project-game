import { Router } from 'express'
import { ForumController } from './forum.controller'

const routerForum = Router()

routerForum.post('/forums', ForumController.create)
routerForum.get('/forums', ForumController.getAll)
routerForum.get('/forums/:id', ForumController.getOne)
routerForum.put('/forums', ForumController.update)
routerForum.delete('/forums/:id', ForumController.delete)

export default routerForum
