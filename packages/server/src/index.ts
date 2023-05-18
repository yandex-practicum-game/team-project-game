import { createServer } from 'vite'

import express from 'express'
import cors from 'cors'
import path from 'path'

import prisma from './modules/prisma'
import postgres from './modules/postgres'

import useStaticFiles from './modules/middlewares/useStaticFiles'
import useServerRender from './modules/middlewares/useServerRender'

import testController from './modules/forum/controllers/testController'

const isDev = process.env.NODE_ENV === 'development'
const port = Number(process.env.SERVER_PORT) || 3001
const srcPath = path.resolve('../client')

postgres.pool
  .connect()

  // * CONNECT POSTGRES
  .then(async client => {
    client.release()
    console.log('➜ 🎸 Postgres connected ...')
  })

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

    if (!isDev) {
      app.use('/assets', useStaticFiles)
    }

    app.use((req, res, next) => {
      if (!req.url.startsWith('/api')) {
        useServerRender(req, res, next)
      } else {
        next()
      }
    })

    console.log('➜ 🎸 Init middlewares ...')
    return app
  })

  // * ROUTES
  .then(app => {
    app.get('/api/test', testController)

    console.log('➜ 🎸 Init routes ...')
    return app
  })

  .then(app => {
    app.listen(3001, () => {
      console.log(`➜ 🎸 Server is listening on port: ${port}`)
    })
  })
