import express from 'express'
import path from 'path'

const distPath = path.resolve('../client/dist/')
console.log('distPath:', distPath)
export default express.static(path.resolve(distPath, 'assets'))
