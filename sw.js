importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

workbox.precaching.precacheAndRoute([
  {
    "url": "app.css",
    "revision": "70f09347cf1ce563e5cf1828b940585e"
  },
  {
    "url": "images/offline.jpg",
    "revision": "ab9c676c3e5150f7af577ecc74b73feb"
  },
  {
    "url": "index.html",
    "revision": "e94593bf05aed42cbf9a53ce3e94a1a8"
  },
  {
    "url": "indexOffline.html",
    "revision": "6482374gbriwhbesfb7832g8237283tb"
  },
  {
    "url": "app.js",
    "revision": "714d5cd5d47b458e10c97ccec4ed2e28"
  }
]);

const imgHandler = workbox.strategies.networkOnly()

// const pageHandler = workbox.strategies.networkOnly()

// workbox.routing.registerRoute(
//   new RegExp('.html'),
//   args => {
//     console.log('Returning pageHandler')
//     return pageHandler.handle(args).then(response => {
//         console.log(response)
//         if (!response) {
//           console.log("No Response")
//           return caches.match('indexOffline.html');
//         } else if (response.status === 404) {
//           console.log("Response 404")
//           return caches.match('indexOffline.html');
//         }
//         return response;
//       }).catch((err) => {
//         // Only using this because the above code block does not work as expected
//         return caches.match('indexOffline.html');
//       })
//   }
// )

workbox.routing.registerRoute(
    new RegExp('https://api.openweathermap.org/data/'),
    workbox.strategies.cacheFirst()
  );

workbox.routing.registerRoute(
  new RegExp('https://openweathermap.org/img/'),
  args => {
    console.log('Returning imgHandler')
    return imgHandler.handle(args).then(response => {
        console.log(response)
        if (!response) {
          console.log("No Response")
          return caches.match('images/offline.jpg')
        } else if (response.status === 404) {
          console.log("Response 404")
          return caches.match('images/offline.jpg')
        }
        return response;
      }).catch((err) => {
        // Only using this because the above code block does not work as expected
        return caches.match('images/offline.jpg')
      })
  }
)
