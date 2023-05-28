import { createServer } from 'vite'
import { srcPath } from './constants/path'
import { isDev } from './constants/env'
import { v1 } from './constants/api'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

import staticMiddleware from './modules/middlewares/static.middleware'
import ssrMiddleware from './modules/middlewares/ssr.middleware'
import proxyMiddleware from './modules/middlewares/proxy.middleware'

import routerForum from './modules/forum/forum.router'
import routerTopic from './modules/topic/topic.router'
import routerComment from './modules/comment/comment.router'
import routerUserTheme from './modules/userTheme/user-theme.router'
import routerSiteThemes from './modules/siteThemes/site-themes.router'

import dbConnect from './db'
import EmojiController from './modules/emoji/emoji.controller'
import SiteThemesController from './modules/siteThemes/site-themes.controller'
import { dbInitializer } from './dbInitializer'

;(async function () {
  // * CONNECT DATA BASE
  await dbConnect()

  // * CREATE INITIAL THEMES
  await dbInitializer(SiteThemesController)

  // * INIT EMOJI MODEL
  await dbInitializer(EmojiController)

  // * CREATE APP
  const app = await express()
  console.log('➜ 🎸 Express server started ...')

  // * CREATE VITE SERVER
  if (isDev) {
    const vite = await createServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.set('vite', vite)
    app.use(vite.middlewares)

    console.log('➜ 🎸 Vite server started ...')
  }

  // * MIDDLEWARES
  app.use(cors())
  app.use(cookieParser())

  app.use('/assets', staticMiddleware())
  app.use('/api/v2', proxyMiddleware())

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(ssrMiddleware)

  console.log('➜ 🎸 Init middlewares ...')

  // * ROUTES
  app.use(v1, routerSiteThemes)
  app.use(v1, routerForum)
  app.use(v1, routerTopic)
  app.use(v1, routerComment)
  app.use(v1, routerUserTheme)

  console.log('➜ 🎸 Init routes ...')

  // * LISTENING SERVER
  app.listen(3000, () => {
    console.log(`➜ 🎸 Server is listening on port: ${3000}`)
  })

  return app
})()
