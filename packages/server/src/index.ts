import { createServer } from 'vite'
import { srcPath } from './constants/path'
import { isDev } from './constants/env'
import { v1 } from './constants/api'
import { dbInitializer } from './dbInitializer'

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
import routerUserTheme from './modules/theme/userTheme/user-theme.router'
import routerSiteThemes from './modules/theme/siteThemes/site-themes.router'

import SiteThemesController from './modules/theme/siteThemes/site-themes.controller'
import EmojiController from './modules/emoji/emoji.controller'

import dbConnect from './db'

async function start() {
  const SERVER_PORT = process.env.SERVER_PORT

  // * CONNECT DATABASE
  await dbConnect()

  // * CREATE INIT DATA IN DATABASE
  await dbInitializer(SiteThemesController) //  CREATE THEMES
  await dbInitializer(EmojiController) //  CREATE EMOJI

  // * CREATE APP
  const app = express()

  // * CREATE VITE SERVER
  if (isDev) {
    const vite = await createServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.set('vite', vite)
    app.use(vite.middlewares)
  }

  // * MIDDLEWARES
  app.use(cors())
  app.use(cookieParser())
  app.use('/assets', staticMiddleware())
  app.use('/api/v2', proxyMiddleware())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(ssrMiddleware)

  // * ROUTES
  app.use(v1, routerSiteThemes)
  app.use(v1, routerForum)
  app.use(v1, routerTopic)
  app.use(v1, routerComment)
  app.use(v1, routerUserTheme)

  // * LISTENING SERVER
  app.listen(SERVER_PORT, () => {
    console.log(`➜ 🎸 Server is listening on port: ${SERVER_PORT}`)
  })
}

start()
