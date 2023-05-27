import path from 'path'

export const srcPath = path.resolve(__dirname, '../../../client')
export const distPath = path.resolve(__dirname, '../../../client/dist/')
export const ssrClientPath = path.resolve(
  __dirname,
  '../../../client/dist-ssr/client.cjs'
)
console.log('dirname', __dirname)
console.log('srcPath', srcPath)
console.log('distPath', distPath)
console.log('ssrClientPath', ssrClientPath)
