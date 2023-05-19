import express from 'express'
import path from 'path'

const distPath = path.resolve('../client/dist/')
const isDev = process.env.NODE_ENV === 'development'

const staticFiles = () => {
  if (isDev) {
    return () => undefined
  }
  return express.static(path.resolve(distPath, 'assets'))
}
export default staticFiles
