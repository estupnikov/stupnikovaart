const A = window.ARTWORKS;
const money = n => n ? `€ ${n}` : '';
function artHref(id){ return `artwork.html?id=${encodeURIComponent(id)}` }
function card(a){
  const round = a.round ? ' work-card-round' : '';
  return `<a class="work-card${round}" href="${artHref(a.id)}"><div class="work-card-image"><img src="${a.image}" alt="${a.title}"></div><h3>${a.title}</h3><div class="small">${a.size} · ${a.year}</div>${a.available?`<div class="price">${money(a.price)}</div>`:''}</a>`;
}
function renderWorks(availableOnly=false){
 const root=document.querySelector('[data-works]'); if(!root)return;
 const ids = availableOnly ? ['impersonator','world-wait','shit','uprooted','heart','cockroaches','lessons','rhythm','sorry','gerda','spaghetti'] : ['rhythm','gerda','cockroaches','impersonator','sorry','world-wait','number','heart','lessons','spaghetti','uprooted','shit'];
 root.innerHTML=ids.map(id=>A.find(x=>x.id===id)).filter(Boolean).map(card).join('');
}
function detailThumbs(a){
 const pos=['50% 50%','20% 25%','80% 30%','30% 78%','78% 78%'];
 return pos.map((p,i)=>`<button class="detail-thumb${i===0?' active':''}" type="button" data-pos="${p}" aria-label="View detail ${i+1}"><img src="${a.image}" alt="" style="object-position:${p}"></button>`).join('');
}
function renderArtwork(){
 const root=document.querySelector('[data-artwork]'); if(!root)return;
 const id=new URLSearchParams(location.search).get('id')||'heart';
 const a=A.find(x=>x.id===id)||A[0];
 const idx=A.findIndex(x=>x.id===a.id);
 const next=A[(idx+1)%A.length];
 const related=A.filter(x=>x.id!==a.id && x.available).slice(0,3);
 const status = a.available ? '' : `<div class="status">${a.sold?'Sold':'No longer available'}</div>`;
 const purchase = a.available ? `<div class="big-price">${money(a.price)}</div><a class="ask" href="contact.html?work=${encodeURIComponent(a.title)}">Ask about this work →</a>` : status;
 const storyParas=(a.text||'').split(/\n\s*\n/).filter(Boolean).map(p=>`<p>${p}</p>`).join('');
 root.innerHTML=`
 <div class="artwork-topnav"><a href="works.html">← Back to all works</a><a href="${artHref(next.id)}">Next work →</a></div>
 <div class="artwork-layout design-match">
   <div class="artwork-media">
     <div class="artwork-image ${a.round?'artwork-image-round':''}"><img class="artwork-main-img" src="${a.image}" alt="${a.title}"></div>
     <div class="detail-strip">${detailThumbs(a)}</div>
   </div>
   <aside class="artwork-info">
     <div class="micro">Artwork</div>
     <h1>${a.title}</h1>
     <div class="facts">${a.size}<br>${a.medium}<br>${a.year}<br>Košice, Slovakia</div>
     ${purchase}
     <div class="buy-notes">
       <div><span>◉</span><div><strong>Reservation available</strong><small>A work can be held while we discuss details.</small></div></div>
       <div><span>◌</span><div><strong>Installments possible</strong><small>Partial payments can be arranged.</small></div></div>
       <div><span>◇</span><div><strong>Flexible payment options</strong><small>We can find a practical arrangement.</small></div></div>
       <div><span>↗</span><div><strong>Worldwide shipping</strong><small>Shipping is discussed individually.</small></div></div>
     </div>
   </aside>
 </div>
 <section class="artwork-body">
   <div class="art-tabs" role="tablist">
     <button class="art-tab active" data-tab="description">Description</button>
     <button class="art-tab" data-tab="process">Process</button>
     <button class="art-tab" data-tab="details">Details</button>
     <button class="art-tab" data-tab="related">Related works</button>
   </div>
   <div class="art-panel active" data-panel="description"><div class="story long-story">${storyParas}</div></div>
   <div class="art-panel" data-panel="process"><div class="placeholder-grid"><div>process photo</div><div>detail</div><div>9:16 video</div><div>studio view</div></div><p class="placeholder-note">Real process photos and video can replace these placeholders later.</p></div>
   <div class="art-panel" data-panel="details"><div class="details-grid"><div><b>Artist</b><span>Tania Stupnikova</span></div><div><b>Year</b><span>${a.year}</span></div><div><b>Medium</b><span>${a.medium}</span></div><div><b>Size</b><span>${a.size}</span></div><div><b>Location</b><span>Košice, Slovakia</span></div><div><b>Status</b><span>${a.available?'Available now':(a.sold?'Sold':'Archive')}</span></div></div></div>
   <div class="art-panel" data-panel="related"><div class="related-grid">${related.map(card).join('')}</div></div>
 </section>
 <section class="related keep-looking"><div class="section-head"><span>Keep looking</span><a href="works.html">All works →</a></div><div class="related-grid">${related.map(card).join('')}</div></section>`;
 const mainImg=root.querySelector('.artwork-main-img');
 root.querySelectorAll('.detail-thumb').forEach(btn=>btn.addEventListener('click',()=>{
   root.querySelectorAll('.detail-thumb').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
   const pos=btn.dataset.pos; mainImg.style.objectPosition=pos; mainImg.classList.toggle('detail-mode',pos!=='50% 50%');
 }));
 root.querySelectorAll('.art-tab').forEach(btn=>btn.addEventListener('click',()=>{
   const tab=btn.dataset.tab;
   root.querySelectorAll('.art-tab').forEach(x=>x.classList.toggle('active',x===btn));
   root.querySelectorAll('.art-panel').forEach(x=>x.classList.toggle('active',x.dataset.panel===tab));
 }));
}
document.addEventListener('DOMContentLoaded',()=>{renderWorks(document.body.dataset.available==='true');renderArtwork();});
