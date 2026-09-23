// sw.js
self.addEventListener('install', (event) => self.skipWaiting());
self.addEventListener('activate', (event) => console.log('SW Active'));
self.addEventListener('fetch', (event) => {}); // Chrome demands this empty listener

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                if ('focus' in windowClients[i]) return windowClients[i].focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});