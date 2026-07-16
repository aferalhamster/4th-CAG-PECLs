const CACHE='pecl-offline-v2';
const FILES=['./','index.html','landing-page.html','pecl-form.html','PECL.doc','level-2/','level-4/','level-6/','level-7/','level-8/','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
async function cacheFiles(){const c=await caches.open(CACHE);for(const f of FILES){try{await c.add(f)}catch(e){}}}
self.addEventListener('install',e=>e.waitUntil(cacheFiles().then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('message',e=>{if(e.data==='download')e.waitUntil(cacheFiles().then(()=>e.source.postMessage('Forms are ready for offline use.')))});
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(hit=>{if(hit)return hit;return fetch(e.request).then(response=>{if(e.request.method==='GET')caches.open(CACHE).then(c=>c.put(e.request,response.clone()));return response}).catch(()=>caches.match('./'))})));
