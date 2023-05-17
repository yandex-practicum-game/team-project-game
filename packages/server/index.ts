import express from 'express'
import cors from 'cors'

import prisma from './modules/prisma'
import testController from './modules/testController'
import postgres from './modules/postgres'

import useStaticFiles from './modules/middlewares/useStaticFiles'
import useServerRender from './modules/middlewares/useServerRender'

const isDev = () => process.env.NODE_ENV === 'development'
const port = Number(process.env.SERVER_PORT) || 3001

postgres.pool
  .connect()

  // CONNECT POSTGRES
  .then(async client => {
    console.log('➜ 🎸 Postgres connected ...')
    client.release()
  })

  // CONNECT PRISMA
  .then(async () => {
    await prisma.$connect()
    console.log('➜ 🎸 Prisma connected ...')
  })

  // CREATE APP
  .then(async () => {
    const app = express()
    console.log('➜ 🎸 Express server started ...')
    return app
  })

  // MIDDLEWARES
  .then(app => {
    app.use(cors())

    if (!isDev()) {
      app.use('/assets', useStaticFiles)
    }

    app.use('*', useServerRender)

    return app
  })

  // ROUTES
  .then(app => {
    app.get('/test', testController)
    return app
  })

  .then(app => {
    app.listen(port, () => {
      console.log(`➜ 🎸 Server is listening on port: ${port}`)
    })
  })
