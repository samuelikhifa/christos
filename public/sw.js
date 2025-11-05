// Service Worker for Dr. Christos Etoka Website
// Version 1.0.0

const CACHE_NAME = 'christos-etoka-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about',
  '/programs',
  '/resources',
  '/events',
  '/connect',
  '/manifest.json',
  // Add critical CSS and JS files here when bundled
];

// Assets to cache on first request
const DYNAMIC_ASSETS = [
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy'
];

// Network-first strategy for these paths
const NETWORK_FIRST = [
  '/api/',
  '/contact',
  '/booking'
];

// Cache-first strategy for these file types
const CACHE_FIRST_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.css',
  '.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    handleRequest(request)
  );
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Network-first strategy for API calls and forms
    if (NETWORK_FIRST.some(path => pathname.startsWith(path))) {
      return await networkFirst(request);
    }
    
    // Cache-first strategy for static assets
    if (isStaticAsset(pathname)) {
      return await cacheFirst(request);
    }
    
    // Stale-while-revalidate for pages
    return await staleWhileRevalidate(request);
    
  } catch (error) {
    console.error('Service Worker: Request failed', error);
    return await handleOffline(request);
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Cache-first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE);
        cache.then(c => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => null);
  
  return cachedResponse || await networkResponsePromise;
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url);
  
  // Return cached page if available
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Return offline page for navigation requests
  if (request.mode === 'navigate') {
    const offlinePage = await caches.match('/');
    if (offlinePage) {
      return offlinePage;
    }
  }
  
  // Return a generic offline response
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'You are currently offline. Please check your internet connection.'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Helper function to check if request is for static asset
function isStaticAsset(pathname) {
  return CACHE_FIRST_EXTENSIONS.some(ext => pathname.endsWith(ext));
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingForms = await getPendingForms();
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removePendingForm(form.id);
          console.log('Service Worker: Form submitted successfully');
        }
      } catch (error) {
        console.error('Service Worker: Failed to submit form', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: data.tag || 'general',
    data: data.data || {},
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // Check if the site is already open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if not already open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Helper functions for IndexedDB operations (simplified)
async function getPendingForms() {
  // Implementation would use IndexedDB to store/retrieve pending forms
  return [];
}

async function removePendingForm(id) {
  // Implementation would remove form from IndexedDB
  console.log('Removing pending form:', id);
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_MARK') {
    // Log performance metrics
    console.log('Performance mark:', event.data.mark);
  }
});

console.log('Service Worker: Loaded successfully');
