const cacheName = 'Tempcache2';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/script.js',
                    '/db.js',
                    '/manifest.json',
                    '/styles.css',
                    '/taskicon_400x400.png',
                    '/dexie.js',
                    '/favicon.ico',
                    '/dexie.js.map',
                ])
            })
    );
    try {
        return self.clients.claim();
    } catch (error) {
        console.log(error)
        return 0
    }
    
});


self.addEventListener('activate', function (event) {
    console.log('Service worker activated', event);
})


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => caches.match(event.request, {ignoreSearch: true}))
            .then(function (res) {
                return res || fetch(event.request);
            })
    );
});
