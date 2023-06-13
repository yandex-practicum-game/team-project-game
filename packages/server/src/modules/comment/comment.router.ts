import { Router } from 'express'

import CommentController from './comment.controller'
import authMiddleware from '../middlewares/auth.middleware'

const routerComment = Router()

routerComment.use(authMiddleware)

routerComment.post('/comments', CommentController.create)
routerComment.get('/topics/:topicId/comments', CommentController.getAll)
routerComment.get('/comments/:id', CommentController.getOne)
routerComment.put('/comments', CommentController.update)
routerComment.delete('/comments/:id', CommentController.delete)

export default routerComment
