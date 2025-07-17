const CACHE_NAME = 'ft-dance-v3'; // Увеличиваем версию
const urlsToCache = [
  '/FT_Dance/',
  '/FT_Dance/index.html',
  '/FT_Dance/styles.css',
  '/FT_Dance/pages/styles.html',
  '/FT_Dance/pages/teachers.html',
  '/FT_Dance/pages/shedule.html',
  '/FT_Dance/pages/contact.html',
  '/FT_Dance/pages/registration.html',
  '/FT_Dance/icons/icon-192x192.png',
  '/FT_Dance/icons/icon-512x512.png',
  '/FT_Dance/appstore/inst.jpg',
  '/FT_Dance/appstore/vk.jpg',
  '/FT_Dance/appstore/tg.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Cache addAll failed:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кешированный ответ или делаем запрос
        return response || fetch(event.request)
          .then(response => {
            // Клонируем ответ для кеширования
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});