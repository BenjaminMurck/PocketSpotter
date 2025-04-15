const CACHE_NAME = 'pocketspot-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/data/animals.json',
  '/service-worker.js',
  // Logo's en iconen
  '/images/pocketspot-logo-192.png',
  '/images/pocketspot-logo-512.png',
  '/images/pocketspot-logo.png',
  '/images/animal-placeholder.jpg',
  // Dierafbeeldingen (voeg hier nieuwe .webp-bestanden toe als je ze toevoegt)
  '/images/animals/hypsipetes-madagascariensis.webp',
  '/images/animals/dicrurus-forficatus.webp',
  '/images/animals/corythornis-vintsioides.webp',
  '/images/animals/copsychus-albospecularis.webp',
  '/images/animals/terpsiphone-mutata.webp',
  '/images/animals/foudia-madagascariensis.webp',
  '/images/animals/potamochoerus-larvatus.webp',
  '/images/animals/pteropus-rufus.webp',
  '/images/animals/mungotictis-decemlineata.webp',
  '/images/animals/fossa-fossana.webp',
  '/images/animals/galidia-elegans.webp',
  '/images/animals/setifer-setosus.webp',
  '/images/animals/echinops-telfairi.webp',
  '/images/animals/tenrec-ecaudatus.webp',
  '/images/animals/hemicentetes-semispinosus.webp',
  '/images/animals/cryptoprocta-ferox.webp',
  '/images/animals/varecia-rubra.webp',
  '/images/animals/varecia-variegata.webp',
  '/images/animals/hapalemur-griseus.webp',
  '/images/animals/cheirogaleus-medius.webp',
  '/images/animals/microcebus-murinus.webp',
  '/images/animals/daubentonia-madagascariensis.webp',
  '/images/animals/indri-indri.webp',
  '/images/animals/propithecus-diadema.webp',
  '/images/animals/propithecus-coquereli.webp',
  '/images/animals/propithecus-verreauxi.webp',
  '/images/animals/eulemur-coronatus.webp',
  '/images/animals/eulemur-macaco.webp',
  '/images/animals/eulemur-rubriventer.webp',
  '/images/animals/eulemur-rufifrons.webp',
  '/images/animals/eulemur-fulvus.webp',
  '/images/animals/lemur-catta.webp',
  // Voeg hier meer .webp-bestanden toe als je nieuwe dieren toevoegt
  // Voeg hier eventueel meer statische assets toe
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
}); 