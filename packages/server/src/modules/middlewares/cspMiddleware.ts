import { expressCspHeader, SELF, NONE, NONCE, INLINE } from 'express-csp-header'

const cspMiddleware = () =>
  expressCspHeader({
    directives: {
      'default-src': [
        SELF,
        'https://ya-praktikum.tech/api/v2',
        'http://localhost:3000',
        'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
        'https://ya-praktikum.tech/api/v2/auth/user',
      ],
      'font-src': [SELF],
      'media-src': [SELF],
      'object-src': [NONE],
      'img-src': ['data:', SELF],
      'script-src': [SELF, INLINE],
      'style-src': [SELF, NONCE],
      'worker-src': [SELF],
      'frame-ancestors': [NONE],
      'form-action': [NONE],
    },
  })

export default cspMiddleware
