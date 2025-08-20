// This is a placeholder service worker.
// The actual offline functionality will be implemented in a future sprint.

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // Add a call to skipWaiting here
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
  // console.log('Fetching:', event.request.url);
  // For now, just fetch from the network.
  event.respondWith(fetch(event.request));
});
