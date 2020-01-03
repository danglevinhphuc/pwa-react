let CACHE_NAME = "reactpwac";
let urlsToCache = [
  "/",
  'favicon.ico',
  '/js/jquery-3.2.1.min.js',
  '/js/popper.min.js',
  '/js/bootstrap.min.js',
  '/js/mdb.min.js',
  '/static/js/bundle.js',
  '/css/bootstrap.min.css',
  '/css/mdb.min.css',
  '/css/style.css',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js'
];

// Install a service worker
self.addEventListener("install", event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      console.log("Opened fetch");
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", event => {
  let cacheWhitelist = ["reactpwac"];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      console.log("Opened activate");
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
