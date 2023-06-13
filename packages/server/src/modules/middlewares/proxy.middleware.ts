import { createProxyMiddleware } from 'http-proxy-middleware'

const proxyMiddleware = () => {
  return createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: { '*': '' },
    target: 'https://ya-praktikum.tech',
    onError: err => {
      console.log('[Error] proxyMiddleware:', err)
    },
  })
}

export default proxyMiddleware
