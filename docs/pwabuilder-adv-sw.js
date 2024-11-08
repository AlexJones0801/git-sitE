// Import Workbox from the CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
    // Use Workbox for precaching assets
    workbox.precaching.precacheAndRoute([
        { url: 'index.html', revision: 'b5c19199a26485ac9962a9a17f9052ad' },
        { url: 'script.js', revision: 'c7b87e3881abe601ffb8323ff39e5161' },
        { url: 'style.css', revision: '9f5ce08735b7ac964464ec1d2bf5ae73' }
    ]);
} else {
    console.error('Workbox failed to load');
}
