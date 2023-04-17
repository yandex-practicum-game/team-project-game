/// <reference lib="WebWorker" />
export type {}
declare const self: ServiceWorkerGlobalScope
const staticCacheName = 's-app-v3'
const dynamicCacheName = 'd-app-v3'
const CACHE_NAME = 'cache-v2023'
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
  '/presentation',
  '/game',
]


self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(URLS)
  console.log('install');
  
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
  console.log('activate');
})

self.addEventListener('fetch', event => {
  const { request } = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})

async function cacheFirst(request: Request) {
  const cached = await caches.match(request)
  return cached ?? (await fetch(request))
}

async function networkFirst(request: Request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? (await caches.match('/offline.html'))
  }
}
