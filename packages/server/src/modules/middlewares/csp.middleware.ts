import { expressCspHeader, SELF, NONE, NONCE, INLINE } from 'express-csp-header'
import { isDev } from '../../constants/env'

const cspMiddleware = () =>
  expressCspHeader({
    directives: isDev
      ? {}
      : {
          'default-src': [
            SELF,
            'https://ya-praktikum.tech/api/v2',
            'http://localhost:3000',
            'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
            'https://ya-praktikum.tech/api/v2/auth/user',
            'https://thequackattack-galaxiangame-24.ya-praktikum.tech',
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
