import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
const entryFile = path.resolve('..', 'client', 'dist', 'index.html')
const staticFolder = path.resolve('..', 'client', 'dist')
const port = Number(process.env.SERVER_PORT) || 3001

app.use(express.static(staticFolder))
app.use(cors())

createClientAndConnect()

app.get('*', (_, res) => {
  res.sendFile(entryFile)
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
