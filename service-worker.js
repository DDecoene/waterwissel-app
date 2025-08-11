// 1. Give your cache a version name
const CACHE_NAME = 'waterwissel-cache-v1';

// 2. List all the files that make up your "app shell"
const urlsToCache = [
    './',
    './index.html',
    './expert.html', // Add the new page to the cache
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './README.md' // Good to cache this too for the "About" modal
];

// INSTALL: Caches the app shell
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installing...');
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching app shell');
            return cache.addAll(urlsToCache);
        })
    );
});

// ACTIVATE: Cleans up old caches
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activating...');
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // If the cache name is old (i.e., not our current CACHE_NAME), delete it
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// FETCH: Serves cached content first (Cache-First strategy)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // If the response is in the cache, return it. Otherwise, fetch from the network.
            return response || fetch(e.request);
        })
    );
});