const CACHE_NAME = 'yega-reparto-cache-v1';
// Add assets that are fundamental to the app's shell
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/delivery-icon.svg',
  // Note: Vite generates hashed assets, so we can't hardcode them.
  // The fetch handler will cache them on the fly.
];

// Install the service worker and cache the app shell
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Don't cache API requests, always fetch from network
  if (request.url.includes('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // For other requests, use a cache-first strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // If a cached response is found, return it
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from the network
      return fetch(request).then((networkResponse) => {
        // Clone the response because it's a one-time-use stream
        const responseToCache = networkResponse.clone();

        // Open the cache and add the new response
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        // Return the network response
        return networkResponse;
      }).catch(error => {
        console.error('Service Worker: Fetch failed; returning offline page if available.', error);
        // Optionally, return a fallback offline page if the network fails
        // return caches.match('/offline.html');
      });
    })
  );
});
