import type { NextFunction, Request, Response } from 'express'
import type { ViteDevServer } from 'vite'

import * as fs from 'fs'
import * as path from 'path'

async function serverRender(req: Request, res: Response, next: NextFunction) {
  if (req.url.startsWith('/api')) {
    next()
    return
  }

  const vite = req.app.locals.settings.vite as ViteDevServer
  const url = req.originalUrl
  const isDev = process.env.NODE_ENV === 'development'

  const distPath = path.resolve('../client/dist/')
  const srcPath = path.resolve('../client')
  const ssrClientPath = path.resolve('../client/dist-ssr/client.cjs')

  try {
    let template: string

    if (!isDev) {
      template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
    } else {
      template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

      template = await vite!.transformIndexHtml(url, template)
    }

    let render: (url: string) => Promise<string>
    let store: { getState: () => unknown }

    if (!isDev) {
      render = (await import(ssrClientPath)).render
      store = (await import(ssrClientPath)).store
    } else {
      render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
        .render
      store = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
        .store
    }

    const appStore = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
      store.getState()
    )}</script>`

    const appHtml = await render(url)

    const html = template
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace(`<!--ssr-store-->`, appStore)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    if (isDev) {
      vite!.ssrFixStacktrace(e as Error)
    }
    next(e)
  }
}

export default serverRender
