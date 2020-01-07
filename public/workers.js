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
self.addEventListener("install", function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  console.log("Installing web app");
  return caches.open(CACHE_NAME).then(function(cache) {
    console.log("caching index and important routes");
    return cache.addAll(urlsToCache);
  });
};

self.addEventListener("fetch", function(event) {
  event.respondWith(checkResponse(event.request).catch(function() {
    return returnFromCache(event.request);
  }));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request){
  return new Promise(function(fulfill, reject) {
    fetch(request).then(function(response){
      if(response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function(request){
  return caches.open("offline").then(function (cache) {
    return fetch(request).then(function (response) {
      console.log(response.url + " was cached");
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function(request){
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
     if(!matching || matching.status == 404) {
       return cache.match("offline.html");
     } else {
       return matching;
     }
    });
  });
};
// // Install a service worker
// self.addEventListener("install", event => {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Cache and return requests
// self.addEventListener("fetch", event => {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       // Cache hit - return response
//       console.log("Opened fetch");
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// // Update a service worker
// self.addEventListener("activate", event => {
//   let cacheWhitelist = ["reactpwac"];
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       console.log("Opened activate");
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
