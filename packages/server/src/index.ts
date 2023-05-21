import { createServer } from 'vite'

import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import path from 'path'

import prisma from './modules/prisma'
import postgres from './modules/postgres'

import staticMiddleware from './modules/middlewares/static.middleware'
import ssrMiddleware from './modules/middlewares/ssr.middleware'
import proxyMiddleware from './modules/middlewares/proxy.middleware'
import authMiddleware from './modules/middlewares/auth.middleware'

import routerForum from './modules/forum/forum.router'
import routerTopic from './modules/topic/topic.router'
import routerComment from './modules/comment/comment.router'

const isDev = process.env.NODE_ENV === 'development'
const srcPath = path.resolve('../client')

postgres
  // * CONNECT POSTGRES
  .dbConnect()

  // * CONNECT PRISMA
  .then(async () => {
    await prisma.$connect()
    console.log('➜ 🎸 Prisma connected ...')
  })

  // * CREATE APP
  .then(async () => {
    const app = express()
    console.log('➜ 🎸 Express server started ...')
    return app
  })

  // * CREATE VITE SERVER
  .then(async app => {
    if (!isDev) {
      return app
    }

    const vite = await createServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.set('vite', vite)
    app.use(vite.middlewares)

    console.log('➜ 🎸 Vite server started ...')
    return app
  })

  // * MIDDLEWARES
  .then(app => {
    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.use('/assets', staticMiddleware())
    app.use('/api/v2', proxyMiddleware())

    app.use(ssrMiddleware)

    console.log('➜ 🎸 Init middlewares ...')
    return app
  })

  // * ROUTES
  .then(app => {
    app.use('/api', routerForum)
    app.use('/api', routerTopic)
    app.use('/api', routerComment)

    console.log('➜ 🎸 Init routes ...')
    return app
  })

  .then(app => {
    app.listen(3000, () => {
      console.log(`➜ 🎸 Server is listening on port: ${3000}`)
    })
  })
