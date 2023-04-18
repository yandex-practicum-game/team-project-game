/// <reference lib="WebWorker" />
export type {}
declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = 'cache-v15'
const URLS = [
  '/',
  '/login',
  '/registration',
  '/500',
  '/galaxian',
  '/gameover',
  '/leaderboard',
  '/forum',
  '/profile',
  '/profile/edit',
  '/profile/password',
  '/presentation',
  '/game',
]

self.addEventListener('install', async event => {
  console.log('Service Worker installed')
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(URLS)
    // Кеш установлен
    self.skipWaiting()
  } catch (error) {
    console.error(error)
  }
})

self.addEventListener('activate', async event => {
  console.log('Service Worker activated')
  try {
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames.map(function (cacheName) {
        if (cacheName !== CACHE_NAME) {
          return caches.delete(cacheName)
        }
      })
    )
    // Новый кеш активирован
    self.clients.claim()
  } catch (error) {
    console.error(error)
  }
})

async function fetchRequest(request: Request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)
  if (cachedResponse) {
    // Если есть, возвращаем его из кеша
    return cachedResponse
  } else {
    // Иначе делаем запрос к серверу и кешируем полученный ответ
    const response = await fetch(request)
    await cache.put(request, response.clone())
    // Уведомляем пользователя о новом кеше
    self.registration.showNotification('Космическое обновление', {
      body: 'Доступен новый контент. Пожалуйста, обновите страницу!',
    })
    return response
  }
}

self.addEventListener('fetch', async event => {
  if (
    event.request.url.startsWith('chrome-extension') ||
    event.request.url.includes('extension')
  )
    return
  event.respondWith(fetchRequest(event.request))
})
