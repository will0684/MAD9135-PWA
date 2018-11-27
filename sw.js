importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// workboxSW.router.setDefaultHandler({
//   handler: workboxSW.strategies.cacheFirst()
// });

const OFFLINE_FALLBACK_PAGE = '/indexOffline.html';

workbox.routing.registerRoute(
  new RegExp('http://127.0.0.1:8080/'),
  async ({event}) => {
    console.log('index.html route activated')
    try {
      return await workbox.strategies.networkOnly().handle({event});
    } catch (error) {
      return caches.match(OFFLINE_FALLBACK_PAGE);
    }
  }
);

const OFFLINE_FALLBACK_IMAGE = '/images/offline.jpg';

workbox.routing.registerRoute(
  new RegExp('/images/online.jpg'),
  async ({event}) => {
    console.log('images route activated')
    try {
      return await workbox.strategies.networkOnly().handle({event});
    } catch (error) {
      return caches.match(OFFLINE_FALLBACK_IMAGE);
    }
  }
);
