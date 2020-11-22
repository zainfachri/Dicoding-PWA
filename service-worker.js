importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.skipWaiting();
workbox.clientsClaim();

// cache name
workbox.core.setCacheNameDetails({
  prefix: 'Footbal-Info',
  precache: 'precache',
  runtime: 'runtime',
});

// runtime cache

// pages
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'Footbal-Info-Pages'
  })
);

// stylesheet
workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.cacheFirst({
    cacheName: 'Footbal-Info-Stylesheets',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true
      })
    ]
  })
);
// images
workbox.routing.registerRoute(
  new RegExp('\.(png|svg|jpg|jpeg)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'Footbal-Info-Images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true
      })
    ]
  })
);

// 3. cache football result
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'Footbal-Info-headline',
    cacheExpiration: {
      maxAgeSeconds: 60 * 30 //cache the news content for 30mn
    }
  })
);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/standing.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/img/fachri.jpg', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/sw-register.js', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/contact.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/icon-192x192.png', revision: '1' },
  { url: '/icon-512x512.png', revision: '1' },
  { url: '/icon.png', revision: '1' },
  { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
]);

//=================================================//
//=================================================//
// const CACHE_NAME = 'footballinfo-v7';
// var urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/standing.html",
//   "/manifest.json",
//   "/push.js",
//   "/css/materialize.min.css",
//   "/img/fachri.jpg",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/api.js",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/sw-register.js",
//   "/pages/home.html",
//   "/pages/about.html",
//   "/pages/contact.html",
//   "/pages/saved.html",
//   "/icon-192x192.png",
//   "/icon-512x512.png",
//   "/icon.png",
//   "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
//   "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",

// ];

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   var base_url = "https://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then(function (response) {
//         return response || fetch(event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });


self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
    console.log('Notification Click.');
    return;
  }
  switch (event.action) {
    case 'yes-action':
      console.log('Pengguna memilih action yes.');
      // buka tab baru
      clients.openWindow('https://google.com');
      break;
    case 'no-action':
      console.log('Pengguna memilih action no');
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});