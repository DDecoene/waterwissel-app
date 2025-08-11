/// <reference types="@sveltejs/kit" />
import { build, files, prerendered, version } from '$service-worker';

// De naam van de cache. Door 'version' te gebruiken, krijgen we
// automatisch een nieuwe cache elke keer dat we de app bouwen.
const CACHE_NAME = `cache-${version}`;

// Een lijst van alle bestanden die gecachet moeten worden.
// - 'build': Alle door SvelteKit gegenereerde JS en CSS bestanden.
// - 'files': Alle bestanden uit je 'static' map.
// - 'prerendered': Alle vooraf gerenderde pagina's (zoals '/' en '/expert').
const assetsToCache = build.concat(files).concat(prerendered);

// INSTALL event: wordt uitgevoerd wanneer de service worker voor het eerst wordt geïnstalleerd.
self.addEventListener('install', (event) => {
	console.log('[Service Worker] Installeren...');
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => {
				console.log('[Service Worker] App Shell wordt gecachet');
				return cache.addAll(assetsToCache);
			})
			.catch((err) => {
				console.error('[Service Worker] Cachen mislukt:', err);
			})
	);
});

// ACTIVATE event: wordt uitgevoerd wanneer de nieuwe service worker actief wordt.
// Dit is het perfecte moment om oude caches op te ruimen.
self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activeren...');
	event.waitUntil(
		caches.keys().then(async (cacheNames) => {
			for (const cacheName of cacheNames) {
				// Als de cachenaam niet de huidige is, verwijder hem.
				if (cacheName !== CACHE_NAME) {
					console.log('[Service Worker] Oude cache verwijderen:', cacheName);
					await caches.delete(cacheName);
				}
			}
		})
	);
});

// FETCH event: wordt uitgevoerd voor elke netwerkaanvraag.
// We gebruiken een "cache-first" strategie.
self.addEventListener('fetch', (event) => {
	// We reageren alleen op GET-verzoeken.
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			// Als het bestand in de cache zit, geef dat terug.
			if (cachedResponse) {
				return cachedResponse;
			}
			// Zo niet, haal het van het netwerk.
			return fetch(event.request);
		})
	);
});