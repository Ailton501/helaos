// Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado');

    event.waitUntil(
        caches.open('Icecream-Store-PWA')
            .then(async (cache) => {
                try {
                    await cache.addAll([
                        './',
                        './index.html',
                        './css/style.css',
                        './manifest.json',
                        './app.js',
                        './images/icons/192x192.png',
                        './images/icons/512x512.png',
                        './img/about.jpg',
                        './img/carousel-1.jpg',
                        './img/carousel-2.jpg',
                        './img/header.jpg',
                        './img/portfolio-1.jpg',
                        './img/portfolio-2.jpg',
                        './img/portfolio-3.jpg',
                        './img/portfolio-4.jpg',
                        './img/portfolio-5.jpg',
                        './img/portfolio-6.jpg',
                        './img/product-1.jpg',
                        './img/product-2.jpg',
                        './img/product-3.jpg',
                        './img/product-4.jpg',
                        './img/product-5.jpg',
                        './img/promotion.jpg',
                        './img/service-1.jpg',
                        './img/service-2.jpg',
                        './img/service-3.jpg',
                        './img/service-4.jpg',
                        './img/team-1.jpg',
                        './img/team-2.jpg',
                        './img/team-3.jpg',
                        './img/team-4.jpg',
                        './img/testimonial-1.jpg',
                        './img/testimonial-2.jpg',
                        './img/testimonial-3.jpg',
                        './js/main.js'
                    ]);
                    console.log('Archivos cacheados correctamente');
                } catch (error) {
                    console.error('Error cacheando archivos:', error);
                }
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado');

    const cacheWhitelist = ['Icecream-Store-PWA'];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepción de solicitudes Fetch
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetch solicitado para', event.request.url);

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
            .catch(() => caches.match('./index.html'))
    );
});
