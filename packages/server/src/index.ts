import { createServer } from 'vite'

import express from 'express'
import cors from 'cors'
import path from 'path'

import staticMiddleware from './modules/middlewares/static.middleware'
import ssrMiddleware from './modules/middlewares/ssr.middleware'
import proxyMiddleware from './modules/middlewares/proxy.middleware'

import routerForum from './modules/forum/forum.router'
import dbConnect from './db'

const isDev = process.env.NODE_ENV === 'development'
const srcPath = path.resolve('../client')

dbConnect()
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
    app.use('/assets', staticMiddleware())
    app.use(ssrMiddleware)
    app.use('/api/v2', proxyMiddleware())

    console.log('➜ 🎸 Init middlewares ...')
    return app
  })

  // * ROUTES
  .then(app => {
    app.use('/api', routerForum)

    console.log('➜ 🎸 Init routes ...')
    return app
  })

  .then(app => {
    app.listen(3000, () => {
      console.log(`➜ 🎸 Server is listening on port: ${3000}`)
    })
  })
