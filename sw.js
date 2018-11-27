importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// workboxSW.router.setDefaultHandler({
//   handler: workboxSW.strategies.cacheFirst()
// });

var urlsToCache = [
  '.',
  'index.html',
  'indexOffline.html',
  'images/online.jpg',
  'images/offline.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('MAIN_CACHE')
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

const OFFLINE_FALLBACK_PAGE = '/indexOffline.html';

workbox.routing.registerRoute(
  new RegExp('/'),
  async ({event}) => {
    console.log('index.html route activated')
    try {
      return await workbox.strategies.networkOnly().handle({event});
    } catch (error) {
      return caches.match(OFFLINE_FALLBACK_PAGE);
    }
  }
);

const OFFLINE_FALLBACK_IMAGE = 'images/offline.jpg';

workbox.routing.registerRoute(
  new RegExp('/images/'),
  async ({event}) => {
    console.log('images route activated')
    try {
      return await workbox.strategies.networkOnly().handle({event});
    } catch (error) {
      return caches.match(OFFLINE_FALLBACK_IMAGE);
    }
  }
);
