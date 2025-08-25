const CACHE_NAME = 'time-box-planner-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/components/Header.tsx',
  '/components/TaskList.tsx',
  '/components/TimeGrid.tsx',
  '/utils/dateUtils.ts',
  '/manifest.json',
  '/icon.svg',
  'https://cdn.tailwindcss.com',
];

// Install event - cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache first, then network fallback
self.addEventListener('fetch', event => {
  // We only cache GET requests
  if (event.request.method !== 'GET') {
      return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network, then add to cache
        return fetch(event.request).then(
          networkResponse => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clone the response because it's a stream that can only be consumed once
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                // We don't cache esm.sh responses to avoid issues
                if (!event.request.url.includes('esm.sh')) {
                    cache.put(event.request, responseToCache);
                }
              });

            return networkResponse;
          }
        );
      })
  );
});
