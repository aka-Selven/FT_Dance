const CACHE_NAME = 'ft-dance-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/pages/styles.html',
  '/pages/teachers.html',
  '/pages/shedule.html',
  '/pages/contact.html',
  '/pages/registration.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache)))
    });

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request)))
});