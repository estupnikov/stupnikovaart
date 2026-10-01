const A = window.ARTWORKS || [];
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;", "'":"&#39;"}[c]));
const money = n => n ? `€ ${n}` : '';
function artHref(id){ return `artwork.html?id=${encodeURIComponent(id)}` }
function card(a){
  const round = a.round ? ' work-card-round' : '';
  return `<a class="work-card${round}" href="${artHref(a.id)}"><div class="work-card-image"><img src="${a.image}" alt="${a.title}"></div><h3>${a.title}</h3><div class="small">${a.size} · ${a.year}</div>${a.available?`<div class="price">${money(a.price)}</div>`:''}</a>`;
}
function renderWorks(availableOnly=false){
 const root=document.querySelector('[data-works]'); if(!root)return;
 const ids = availableOnly ? ['impersonator','world-wait','shit','uprooted','heart','cockroaches','lessons','rhythm','sorry','gerda','spaghetti'] : ['rhythm','gerda','cockroaches','impersonator','sorry','world-wait','number','heart','lessons','spaghetti','uprooted','shit'];
 const collection=ids.map(id=>A.find(x=>x.id===id)).filter(a=>a && (!availableOnly || a.available === true));
 const controls=document.createElement('div');controls.className='collection-controls';
 controls.innerHTML=`<label>Year <select aria-label="Filter works by year"><option value="">All years</option>${[...new Set(collection.map(a=>a.year))].sort((a,b)=>b-a).map(year=>`<option>${year}</option>`).join('')}</select></label><label>Search <input type="search" aria-label="Search artwork titles" placeholder="Artwork title"></label>`;
 root.before(controls);
 const year=controls.querySelector('select'),search=controls.querySelector('input');
 const update=()=>{
   const works=collection.filter(a=>(!year.value || String(a.year)===year.value) && a.title.toLowerCase().includes(search.value.trim().toLowerCase()));
   root.innerHTML=works.length?works.map(card).join(''):'<p class="empty-collection" role="status">No works match this search.</p>';
 };
 year.addEventListener('change',update);search.addEventListener('input',update);update();
}
function detailThumbs(a){
 const images=[a.image,...(a.detailImages || [])];
 if(images.length<2)return '';
 return images.map((src,i)=>`<button class="detail-thumb${i===0?' active':''}" type="button" data-src="${escapeHTML(src)}" aria-pressed="${i===0}" aria-label="${i===0?'View full artwork':`View additional image ${i}`}"><img src="${escapeHTML(src)}" alt=""></button>`).join('');
}
function renderArtwork(){
 const root=document.querySelector('[data-artwork]'); if(!root)return;
 const id=new URLSearchParams(location.search).get('id')||'heart';
 const a=A.find(x=>x.id===id);
 if(!a){root.innerHTML='<h1>Artwork not found</h1><a class="text-link" href="works.html">Explore works →</a>';return;}
 document.title=`${a.title} · Tania Stupnikova`;
 const idx=A.findIndex(x=>x.id===a.id);
 const next=A[(idx+1)%A.length];
 const previous=A[(idx-1+A.length)%A.length];
 const related=[...A.slice(idx+1),...A.slice(0,idx)].slice(0,3);
 const status = a.available ? '<div class="status">Available now · to confirm</div>' : `<div class="status">${a.sold?'Sold · to confirm':a.available===false?'Unavailable · to confirm':'Enquire about availability'}</div>`;
 const purchase = a.available ? `${status}<div class="big-price">${money(a.price)}</div><a class="ask" href="contact.html?work=${encodeURIComponent(a.title)}">Ask about this work →</a>` : status;
 const storyParas=(a.text||'').split(/\n\s*\n/).filter(Boolean).map(p=>`<p>${escapeHTML(p)}</p>`).join('');
 root.innerHTML=`
 <div class="artwork-topnav"><a href="works.html">← Back to all works</a><div><a href="${artHref(previous.id)}">← Previous work</a><a href="${artHref(next.id)}">Next work →</a></div></div>
 <div class="artwork-layout design-match">
   <div class="artwork-media">
     <div class="artwork-image ${a.round?'artwork-image-round':''}"><img class="artwork-main-img" src="${a.image}" alt="${a.title}"></div>
     <div class="detail-strip">${detailThumbs(a)}</div>
   </div>
   <aside class="artwork-info">
     <div class="micro">Artwork</div>
     <h1>${a.title}</h1>
     <div class="facts">${a.size}<br>${a.medium}<br>${a.year}</div>
     ${purchase}
     <p class="content-note">Price and availability are provisional. Please enquire to confirm.</p>
     ${a.available ? `<div class="buy-notes">
       <div><span>◉</span><div><strong>Reservation available</strong><small>A work can be held while we discuss details.</small></div></div>
       <div><span>◌</span><div><strong>Installments possible</strong><small>Partial payments can be arranged.</small></div></div>
       <div><span>◇</span><div><strong>Flexible payment options</strong><small>We can find a practical arrangement.</small></div></div>
       <div><span>↗</span><div><strong>Worldwide shipping</strong><small>Shipping is discussed individually.</small></div></div>
     </div>` : ''}
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
   <div class="art-panel" data-panel="details"><div class="details-grid"><div><b>Artist</b><span>Tania Stupnikova</span></div><div><b>Year</b><span>${a.year}</span></div><div><b>Medium</b><span>${a.medium}</span></div><div><b>Size</b><span>${a.size}</span></div><div><b>Status</b><span>${a.available===true?'Available now':(a.sold?'Sold':a.available===false?'Unavailable':'Enquire about availability')}</span></div></div></div>
   <div class="art-panel" data-panel="related"><div class="related-grid">${related.map(card).join('')}</div></div>
 </section>
 <section class="related keep-looking"><div class="section-head"><span>Keep looking</span><a href="works.html">All works →</a></div><div class="related-grid">${related.map(card).join('')}</div></section>`;
 const mainImg=root.querySelector('.artwork-main-img');
 root.querySelectorAll('.detail-thumb').forEach(btn=>btn.addEventListener('click',()=>{
   root.querySelectorAll('.detail-thumb').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
   mainImg.src=btn.dataset.src;
   root.querySelectorAll('.detail-thumb').forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));
 }));
 const tabs=[...root.querySelectorAll('.art-tab')];
 const selectTab=btn=>{
   tabs.forEach(x=>{x.setAttribute('aria-selected',String(x===btn));x.tabIndex=x===btn?0:-1;});
 };
 tabs.forEach((btn,i)=>{
   btn.setAttribute('role','tab');btn.id=`tab-${btn.dataset.tab}`;btn.setAttribute('aria-controls',`panel-${btn.dataset.tab}`);
   const panel=root.querySelector(`[data-panel="${btn.dataset.tab}"]`);
   panel.id=`panel-${btn.dataset.tab}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',btn.id);
   btn.addEventListener('keydown',event=>{
     let target;
     if(event.key==='ArrowRight')target=tabs[(i+1)%tabs.length];
     if(event.key==='ArrowLeft')target=tabs[(i-1+tabs.length)%tabs.length];
     if(event.key==='Home')target=tabs[0];
     if(event.key==='End')target=tabs[tabs.length-1];
     if(target){event.preventDefault();target.click();target.focus();}
   });
 });
 selectTab(tabs[0]);
 root.querySelectorAll('.art-tab').forEach(btn=>btn.addEventListener('click',()=>{
   const tab=btn.dataset.tab;selectTab(btn);
   root.querySelectorAll('.art-tab').forEach(x=>x.classList.toggle('active',x===btn));
   root.querySelectorAll('.art-panel').forEach(x=>x.classList.toggle('active',x.dataset.panel===tab));
 }));
}
document.addEventListener('DOMContentLoaded',()=>{
 renderWorks(document.body.dataset.available==='true');renderArtwork();
 const selected=document.querySelector('[data-selected]');
 if(selected)selected.innerHTML=['cockroaches','spaghetti','heart'].map(id=>A.find(a=>a.id===id)).filter(Boolean).map(card).join('');
 const page=location.pathname.split('/').pop() || 'index.html';
 document.querySelectorAll('.nav a').forEach(link=>{
   if(link.getAttribute('href')===page || (page==='artwork.html' && link.getAttribute('href')==='works.html'))link.setAttribute('aria-current','page');
 });
 const main=document.querySelector('main');
 if(main){main.id='main-content';const skip=document.createElement('a');skip.href='#main-content';skip.className='skip-link';skip.textContent='Skip to content';document.body.prepend(skip);}
 const enquiry=document.querySelector('[data-enquiry]');
 const work=new URLSearchParams(location.search).get('work');
 if(enquiry && work){enquiry.textContent=`Enquiry about: ${work}`;enquiry.hidden=false;}
 const email=document.querySelector('[data-email]');
 if(email && work)email.href=`mailto:stupnikova.art@gmail.com?subject=${encodeURIComponent(`Artwork enquiry: ${work}`)}`;
});
