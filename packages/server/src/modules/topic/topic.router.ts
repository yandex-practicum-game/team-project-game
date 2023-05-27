import { Router } from 'express'
import TopicController from './topic.controller'
import authMiddleware from '../middlewares/auth.middleware'

const routerTopic = Router()

routerTopic.use(authMiddleware)

routerTopic.post('/topics', TopicController.create)
routerTopic.get('/forums/:id/topics', TopicController.getAll)
routerTopic.get('/topics/:id', TopicController.getOne)
routerTopic.put('/topics', TopicController.update)
routerTopic.delete('/topics/:id', TopicController.delete)

export default routerTopic
