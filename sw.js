self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('ft-dance-v3').then((cache) => {
      return cache.addAll([
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

      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});