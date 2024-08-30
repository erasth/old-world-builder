(()=>{"use strict";var e={295:()=>{try{self["workbox:core:5.1.4"]&&_()}catch(e){}},229:()=>{try{self["workbox:expiration:5.1.4"]&&_()}catch(e){}},740:()=>{try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}},130:()=>{try{self["workbox:routing:5.1.4"]&&_()}catch(e){}},205:()=>{try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{s(295);const e=function(e){let t=e;for(var s=arguments.length,n=new Array(s>1?s-1:0),a=1;a<s;a++)n[a-1]=arguments[a];return n.length>0&&(t+=` :: ${JSON.stringify(n)}`),t};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const n=new Set;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},r=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||r(a.precache),c=e=>e||r(a.runtime);const o=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),""),h=(e,t)=>e.filter((e=>t in e)),l=async e=>{let{request:t,mode:s,plugins:n=[]}=e;const a=h(n,"cacheKeyWillBeUsed");let r=t;for(const i of a)r=await i.cacheKeyWillBeUsed.call(i,{mode:s,request:r}),"string"===typeof r&&(r=new Request(r));return r},u=async e=>{let{cacheName:t,request:s,event:n,matchOptions:a,plugins:r=[]}=e;const i=await self.caches.open(t),c=await l({plugins:r,request:s,mode:"read"});let o=await i.match(c,a);for(const h of r)if("cachedResponseWillBeUsed"in h){const e=h.cachedResponseWillBeUsed;o=await e.call(h,{cacheName:t,event:n,matchOptions:a,cachedResponse:o,request:c})}return o},d=async e=>{let{cacheName:s,request:a,response:r,event:i,plugins:c=[],matchOptions:d}=e;const p=await l({plugins:c,request:a,mode:"write"});if(!r)throw new t("cache-put-with-no-response",{url:o(p.url)});const f=await(async e=>{let{request:t,response:s,event:n,plugins:a=[]}=e,r=s,i=!1;for(const c of a)if("cacheWillUpdate"in c){i=!0;const e=c.cacheWillUpdate;if(r=await e.call(c,{request:t,response:r,event:n}),!r)break}return i||(r=r&&200===r.status?r:void 0),r||null})({event:i,plugins:c,response:r,request:p});if(!f)return void 0;const g=await self.caches.open(s),m=h(c,"cacheDidUpdate"),w=m.length>0?await u({cacheName:s,matchOptions:d,request:p}):null;try{await g.put(p,f)}catch(y){throw"QuotaExceededError"===y.name&&await async function(){for(const e of n)await e()}(),y}for(const t of m)await t.cacheDidUpdate.call(t,{cacheName:s,event:i,oldResponse:w,newResponse:f,request:p})},p=u;let f;function g(e){e.then((()=>{}))}class m{constructor(e,t){let{onupgradeneeded:s,onversionchange:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let s=!1;setTimeout((()=>{s=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"===typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e){let{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return await this.transaction([e],"readonly",((i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(r?e:e.value),a&&l.length>=a?c(l):e.continue()):c(l)}}))}async transaction(e,t,s){return await this.open(),await new Promise(((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,(e=>n(e)))}))}async _call(e,t,s){for(var n=arguments.length,a=new Array(n>3?n-3:0),r=3;r<n;r++)a[r-3]=arguments[r];return await this.transaction([t],s,((s,n)=>{const r=s.objectStore(t),i=r[e].apply(r,a);i.onsuccess=()=>n(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}m.prototype.OPEN_TIMEOUT=2e3;const w={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[s,G]of Object.entries(w))for(const e of G)e in IDBObjectStore.prototype&&(m.prototype[e]=async function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];return await this._call(e,t,s,...a)});const y=async e=>{let{request:s,fetchOptions:n,event:a,plugins:r=[]}=e;if("string"===typeof s&&(s=new Request(s)),a instanceof FetchEvent&&a.preloadResponse){const e=await a.preloadResponse;if(e)return e}const i=h(r,"fetchDidFail"),c=i.length>0?s.clone():null;try{for(const e of r)if("requestWillFetch"in e){const t=e.requestWillFetch,n=s.clone();s=await t.call(e,{request:n,event:a})}}catch(l){throw new t("plugin-error-request-will-fetch",{thrownError:l})}const o=s.clone();try{let e;e="navigate"===s.mode?await fetch(s):await fetch(s,n);for(const t of r)"fetchDidSucceed"in t&&(e=await t.fetchDidSucceed.call(t,{event:a,request:o,response:e}));return e}catch(u){0;for(const e of i)await e.fetchDidFail.call(e,{error:u,event:a,originalRequest:c.clone(),request:o.clone()});throw u}};async function _(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,r=function(){if(void 0===f){const t=new Response("");if("body"in t)try{new Response(t.body),f=!0}catch(e){f=!1}f=!1}return f}()?s.body:await s.blob();return new Response(r,a)}s(229);const v="cache-entries",R=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class x{constructor(e){this._cacheName=e,this._db=new m("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(v,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const s={url:e=R(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(v,s)}async getTimestamp(e){return(await this._db.get(v,this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction(v,"readwrite",((s,n)=>{const a=s.objectStore(v).index("timestamp").openCursor(null,"prev"),r=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else n(r)}})),n=[];for(const a of s)await this._db.delete(v,a.id),n.push(a.url);return n}_getId(e){return this._cacheName+"|"+R(e)}}class q{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new x(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,g(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(740);const U=[],b={get:()=>U,add(e){U.push(...e)}};function T(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}class E{constructor(e){this._cacheName=i(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const s=[];for(const n of e){"string"===typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=T(n),r="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install(){let{event:e,plugins:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const s=[],n=[],a=await self.caches.open(this._cacheName),r=await a.keys(),i=new Set(r.map((e=>e.url)));for(const[o,h]of this._urlsToCacheKeys)i.has(h)?n.push(o):s.push({cacheKey:h,url:o});const c=s.map((s=>{let{cacheKey:n,url:a}=s;const r=this._cacheKeysToIntegrities.get(n),i=this._urlsToCacheModes.get(a);return this._addURLToCache({cacheKey:n,cacheMode:i,event:e,integrity:r,plugins:t,url:a})}));await Promise.all(c);return{updatedURLs:s.map((e=>e.url)),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache(e){let{cacheKey:s,url:n,cacheMode:a,event:r,plugins:i,integrity:c}=e;const o=new Request(n,{integrity:c,cache:a,credentials:"same-origin"});let h,l=await y({event:r,plugins:i,request:o});for(const t of i||[])"cacheWillUpdate"in t&&(h=t);if(!(h?await h.cacheWillUpdate({event:r,request:o,response:l}):l.status<400))throw new t("bad-precaching-response",{url:n,status:l.status});l.redirected&&(l=await _(l)),await d({event:r,plugins:i,response:l,request:s===n?o:new Request(s),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return async s=>{let{request:n}=s;try{const e=await this.matchPrecache(n);if(e)return e;throw new t("missing-precache-entry",{cacheName:this._cacheName,url:n instanceof Request?n.url:n})}catch(a){if(e)return fetch(n);throw a}}}createHandlerBoundToURL(e){let s=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),a=new Request(e);return()=>n({request:a})}}let L;const N=()=>(L||(L=new E),L);const K=(e,t)=>{const s=N().getURLsToCacheKeys();for(const n of function(e){let{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function*(){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}()}(e,t)){const e=s.get(n);if(e)return e}},C=function(){let{ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const a=i();self.addEventListener("fetch",(r=>{const i=K(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!i)return void 0;let c=self.caches.open(a).then((e=>e.match(i))).then((e=>e||fetch(i)));r.respondWith(c)}))};let M=!1;const A=e=>{const t=N(),s=b.get();e.waitUntil(t.install({event:e,plugins:s}).catch((e=>{throw e})))},O=e=>{const t=N();e.waitUntil(t.activate())};s(130);const S=e=>e&&"object"===typeof e?e:{handle:e};class k{constructor(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";this.handler=S(t),this.match=e,this.method=s}}class W extends k{constructor(e,t,s){super((t=>{let{url:s}=t;const n=e.exec(s.href);if(n&&(s.origin===location.origin||0===n.index))return n.slice(1)}),t,s)}}class D{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((e=>{"string"===typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest(e){let{request:t,event:s}=e;const n=new URL(t.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const{params:a,route:r}=this.findMatchingRoute({url:n,request:t,event:s});let i=r&&r.handler;if(!i&&this._defaultHandler&&(i=this._defaultHandler),!i)return void 0;let c;try{c=i.handle({url:n,request:t,event:s,params:a})}catch(o){c=Promise.reject(o)}return c instanceof Promise&&this._catchHandler&&(c=c.catch((e=>this._catchHandler.handle({url:n,request:t,event:s})))),c}findMatchingRoute(e){let{url:t,request:s,event:n}=e;const a=this._routes.get(s.method)||[];for(const r of a){let e;const a=r.match({url:t,request:s,event:n});if(a)return e=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"===typeof a)&&(e=void 0),{route:r,params:e}}return{}}setDefaultHandler(e){this._defaultHandler=S(e)}setCatchHandler(e){this._catchHandler=S(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let I;const P=()=>(I||(I=new D,I.addFetchListener(),I.addCacheListener()),I);function H(e,s,n){let a;if("string"===typeof e){const t=new URL(e,location.href);0;a=new k((e=>{let{url:s}=e;return s.href===t.href}),s,n)}else if(e instanceof RegExp)a=new W(e,s,n);else if("function"===typeof e)a=new k(e,s,n);else{if(!(e instanceof k))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return P().registerRoute(a),a}s(205);const F={cacheWillUpdate:async e=>{let{response:t}=e;return 200===t.status||0===t.status?t:null}};var j;self.addEventListener("activate",(()=>self.clients.claim())),function(e){N().addToCacheList(e),e.length>0&&(self.addEventListener("install",A),self.addEventListener("activate",O))}([{'revision':'391782c8c567a81ce0661979aafbd9e9','url':'/index.html'},{'revision':null,'url':'/static/css/main.b16413a1.css'},{'revision':null,'url':'/static/js/453.6d1697a3.chunk.js'},{'revision':null,'url':'/static/js/main.5dffd819.js'},{'revision':'8c75c540bc0eb6dbca1fca7f470858be','url':'/static/media/beastmen.6a9fce0fd733488c35e356bda2e042f4.svg'},{'revision':'6a7beed83e9ebe73744bc61a5e32e42f','url':'/static/media/bretonnia.e5c3a1d0cda0c8b9b86cda30f5d33f90.svg'},{'revision':'758b9f0b9e30357dc198bdb835839993','url':'/static/media/chaos-deamons.1f26ab656855514be12c0e7db8c6b32d.svg'},{'revision':'3968332ea71fd0cc7af274c2cceedfb1','url':'/static/media/chaos-dwarfs.ee5f1bd3dabda3d5856f199d52b3b526.svg'},{'revision':'b870604c6b6a68bf384eacd0d64dbad5','url':'/static/media/chaos-warriors.95dbc8c2e20911b0d0f50eec0ecc875b.svg'},{'revision':'91d821e6dc0f4175c3e48aeee3f3894f','url':'/static/media/dark-elves.9d17a9e44a1dc8c532b8e9c195bb9349.svg'},{'revision':'dc96aecec7571d30571e2063706e82dd','url':'/static/media/dwarfs.d1515ee28ee729eab0223051e8213f1e.svg'},{'revision':null,'url':'/static/media/fantasywelt_de.3e01438afdb1af5fda51.jpg'},{'revision':null,'url':'/static/media/fantasywelt_en.77ecbbfee64b462b792e.jpg'},{'revision':null,'url':'/static/media/forg3d.33b515df8b1916969003.jpg'},{'revision':'017cb73ecd5e1c49a7bf92d668412796','url':'/static/media/france.bf26b172fbb19d5193a5a0a28e69c4ba.svg'},{'revision':'7ff3f5d07e94e111d195a22d8bcf7b95','url':'/static/media/germany.d9625f93cc14fcc164d63bed94bec76e.svg'},{'revision':'e2b6e2998eed09ae6c395710c323cd98','url':'/static/media/greenskins.ea460b464152f5a93cc8550adc0a40fe.svg'},{'revision':'369c5d00afcc1c2915ba37d71d3bb7d1','url':'/static/media/high-elves.446a07c8c1502e6229747d52b78b99f5.svg'},{'revision':'48651b91715991f28ac67418cececd1f','url':'/static/media/italy.bb2033dcda58d584b313a60a850a36cb.svg'},{'revision':'e904785e6d98ffbe12bde4e5b53bcd76','url':'/static/media/lizardmen.1864459dda98e2341482261f911f4fbe.svg'},{'revision':null,'url':'/static/media/mwg-forge.6cc9d70962649b7d09e6.gif'},{'revision':'e48089e45b66dd85795dba907706589d','url':'/static/media/ogres.8b76905b48d6dc99e2717dc991ec120c.svg'},{'revision':'dfb064d1a4dc920fb2080ffc66864dd2','url':'/static/media/polen.0882b3e3846c9861e7150d74c94a7ee9.svg'},{'revision':'42e604b6a561cd97723dd53d7f663aa5','url':'/static/media/skaven.76cb48b7ee586866d155fdf90d147f72.svg'},{'revision':'068aa2fcf0a0174468e7b1f7d2916755','url':'/static/media/spain.fe46f7a778fdc34b4cb31895f52d2247.svg'},{'revision':'265b10ff67a41e5afc474442915753de','url':'/static/media/symbol-defs.c922dfac301e49a29e8f731fdb058096.svg'},{'revision':'b93e49ea1c0b3ada852f6b78ab17e75e','url':'/static/media/the-empire.d3620178330194a2108c5d16ee252a3f.svg'},{'revision':'564cf97e071b7df6fb11b900d58366bb','url':'/static/media/tomb-kings.9b30c54116cba0104b185153a5a522dd.svg'},{'revision':'addf813f3ea1de2b14db7dfef5de6588','url':'/static/media/usa.699fdb72b59257b15c15b5c08cfe4b3d.svg'},{'revision':'44a0f71a7fe4a7d570444e668b86eab6','url':'/static/media/vampire-counts.fd13d874116de00f9855c6d96285c1d0.svg'},{'revision':'fb0ecbab1934dade3426b665a874de44','url':'/static/media/wood-elves.2b1066f8b82dc538ef1c9848d30911ab.svg'}]),function(e){M||(C(e),M=!0)}(j);const B=new RegExp("/[^/?]+\\.[^/]+$");var $;H((e=>{let{request:t,url:s}=e;return"navigate"===t.mode&&(!s.pathname.startsWith("/_")&&!s.pathname.match(B))}),($="/index.html",N().createHandlerBoundToURL($))),H((e=>{let{url:t}=e;return t.origin===self.location.origin&&t.pathname.endsWith(".png")}),new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this._cacheName=c(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[F,...e.plugins]}else this._plugins=[F];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle(e){let{event:s,request:n}=e;"string"===typeof n&&(n=new Request(n));const a=this._getFromNetwork({request:n,event:s});let r,i=await p({cacheName:this._cacheName,request:n,event:s,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(s)try{s.waitUntil(a)}catch(r){0}}else{0;try{i=await a}catch(c){r=c}}if(!i)throw new t("no-response",{url:n.url,error:r});return i}async _getFromNetwork(e){let{request:t,event:s}=e;const n=await y({request:t,event:s,fetchOptions:this._fetchOptions,plugins:this._plugins}),a=d({cacheName:this._cacheName,request:t,response:n.clone(),event:s,plugins:this._plugins});if(s)try{s.waitUntil(a)}catch(r){0}return n}}({cacheName:"images",plugins:[new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var t;this.cachedResponseWillBeUsed=async e=>{let{event:t,request:s,cacheName:n,cachedResponse:a}=e;if(!a)return null;const r=this._isResponseDateFresh(a),i=this._getCacheExpiration(n);g(i.expireEntries());const c=i.updateTimestamp(s.url);if(t)try{t.waitUntil(c)}catch(o){0}return r?a:null},this.cacheDidUpdate=async e=>{let{cacheName:t,request:s}=e;const n=this._getCacheExpiration(t);await n.updateTimestamp(s.url),await n.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),n.add(t))}_getCacheExpiration(e){if(e===c())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new q(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((e=>Promise.all(e.map((function(e){return caches.delete(e)}))))))}))})()})();
//# sourceMappingURL=service-worker.js.map