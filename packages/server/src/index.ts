import { createServer } from 'vite'

import express from 'express'
import cors from 'cors'
import path from 'path'

import prisma from './modules/prisma'
import postgres from './modules/postgres'

import staticFiles from './modules/middlewares/staticFiles'
import serverRender from './modules/middlewares/serverRender'

import routerForum from './modules/forum/forum.router'

const isDev = process.env.NODE_ENV === 'development'
const port = Number(process.env.SERVER_PORT) || 3001
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
    app.use('/assets', staticFiles())
    app.use(serverRender)

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
    app.listen(3001, () => {
      console.log(`➜ 🎸 Server is listening on port: ${port}`)
    })
  })
