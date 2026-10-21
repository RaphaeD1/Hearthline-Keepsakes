(()=>{
"use strict";
const catalog=Array.isArray(window.HEARTHLINE_PRODUCTS)?window.HEARTHLINE_PRODUCTS:[];
const $=(id)=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const clean=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storageKey='hearthline_preview_cart_v1';
let cart=[];try{const parsed=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(parsed))cart=parsed.filter(x=>catalog.some(p=>p.id===x.id)).slice(0,30)}catch{}
let filter='all',search='',lastFocus=null;
const art=p=>'<div class="product-art '+clean(p.art)+'"><span class="product-tag">'+clean(p.tag)+'</span><div class="art-object">'+clean(p.preview)+'<small>hearthline keepsakes</small></div></div>';
function save(){try{localStorage.setItem(storageKey,JSON.stringify(cart))}catch{}$('cartCount').textContent=cart.length}
function drawProducts(){
 const list=catalog.filter(p=>(filter==='all'||p.category===filter)&&[p.name,p.type,p.description].join(' ').toLowerCase().includes(search));
 $('productCount').textContent=list.length+' design'+(list.length===1?'':'s');
 $('products').innerHTML=list.map(p=>'<article class="product-card">'+art(p)+'<div class="product-meta"><div><p>'+clean(p.type)+'</p><h3>'+clean(p.name)+'</h3></div><strong>'+money(p.price)+'</strong></div><button type="button" class="detail-link" data-product="'+clean(p.id)+'">Personalize & explore →</button></article>').join('')||'<p>No designs match that search.</p>';
}
function openModal(id){lastFocus=document.activeElement;const modal=$(id);modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.close')?.focus()}
function closeModal(id){$(id).hidden=true;document.body.style.overflow='';lastFocus?.focus()}
function showToast(message){const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('show'),2800)}
function openDetail(id){
 const p=catalog.find(x=>x.id===id);if(!p)return;
 $('detailContent').innerHTML='<div class="detail-grid">'+art(p)+'<div><div class="detail-type">'+clean(p.type)+'</div><h2 id="detailTitle">'+clean(p.name)+'</h2><strong>'+money(p.price)+'</strong><p>'+clean(p.description)+'</p><label for="personalText">'+clean(p.prompt)+'</label><input id="personalText" maxlength="60" placeholder="'+clean(p.placeholder)+'" autocomplete="off"><p class="tiny">Personalization preview: <b id="personalPreview">'+clean(p.placeholder)+'</b></p><button class="button solid" id="addSelection">Save this selection</button><p class="tiny">Concept price only. No order or payment is placed.</p></div></div>';
 const input=$('personalText');input.addEventListener('input',()=>{$('personalPreview').textContent=input.value.trim()||p.placeholder});
 $('addSelection').addEventListener('click',()=>{cart.push({id:p.id,personalization:input.value.trim().slice(0,60)});save();closeModal('detailBackdrop');showToast('Saved to your selection');});
 openModal('detailBackdrop');
}
function renderCart(){
 if(!cart.length){$('cartItems').innerHTML='<p>Your selection is empty. Explore a few designs to get started.</p>';$('cartTotal').textContent='';return}
 $('cartItems').innerHTML=cart.map((x,i)=>{const p=catalog.find(y=>y.id===x.id);return p?'<div class="cart-line"><div><b>'+clean(p.name)+'</b><small>'+clean(x.personalization||'No personalization')+'</small><small>'+money(p.price)+' · sample price</small>'+(p.buyUrl?'<a href="'+clean(p.buyUrl)+'" target="_blank" rel="noopener noreferrer">View approved listing ↗</a>':'')+'</div><button type="button" data-remove="'+i+'">Remove</button></div>':''}).join('');
 const total=cart.reduce((n,x)=>n+(catalog.find(p=>p.id===x.id)?.price||0),0);
 $('cartTotal').textContent='Illustrative total: '+money(total);
}
async function copyCart(){
 if(!cart.length){showToast('Add a design first');return}
 const lines=['HEARTHLINE KEEPSAKES — DESIGN SELECTION (not an order)',...cart.map((x,i)=>{const p=catalog.find(y=>y.id===x.id);return (i+1)+'. '+p.name+' | '+(x.personalization||'No personalization')+' | sample '+money(p.price)}),'Illustrative total: '+money(cart.reduce((n,x)=>n+(catalog.find(p=>p.id===x.id)?.price||0),0)),'No payment or order has been placed.'];
 const txt=lines.join('\n');
 try{await navigator.clipboard.writeText(txt);showToast('Selection copied')}catch{showToast('Clipboard unavailable — select and copy manually');alert(txt)}
}
document.addEventListener('click',e=>{
 const filterButton=e.target.closest('[data-filter]');if(filterButton){filter=filterButton.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===filterButton);b.setAttribute('aria-pressed',String(b===filterButton))});drawProducts()}
 const product=e.target.closest('[data-product]');if(product)openDetail(product.dataset.product);
 const remove=e.target.closest('[data-remove]');if(remove){cart.splice(Number(remove.dataset.remove),1);save();renderCart()}
});
$('search').addEventListener('input',e=>{search=e.target.value.trim().toLowerCase();drawProducts()});
$('openCart').addEventListener('click',()=>{renderCart();openModal('cartBackdrop')});
$('closeCart').addEventListener('click',()=>closeModal('cartBackdrop'));
$('closeDetail').addEventListener('click',()=>closeModal('detailBackdrop'));
$('copyCart').addEventListener('click',copyCart);
['cartBackdrop','detailBackdrop'].forEach(id=>$(id).addEventListener('click',e=>{if(e.target===$(id))closeModal(id)}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('detailBackdrop').hidden)closeModal('detailBackdrop');else if(!$('cartBackdrop').hidden)closeModal('cartBackdrop')}});
$('year').textContent=new Date().getFullYear();save();drawProducts();
})();