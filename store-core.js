/* Pure storefront rules. No payments, customer addresses, or credentials. */
(function(root){
'use strict';
const MAX_SELECTIONS=30;
function normalizeCart(value,catalog){
 if(!Array.isArray(value))return [];
 return value.filter(x=>x&&typeof x==='object'&&catalog.some(p=>p.id===x.id)&&typeof x.personalization==='string').slice(0,MAX_SELECTIONS).map(x=>({id:x.id,personalization:x.personalization.trim().slice(0,60)}));
}
function listingUrl(product){
 if(product?.listingVerified!==true || !product.buyUrl)return '';
 try {const u=new URL(product.buyUrl);
 if(u.protocol!=='https:'||u.username||u.password||u.port)return '';
 const etsy=(u.hostname==='www.etsy.com'||u.hostname==='etsy.com')&&/^\/listing\/\d+(?:\/|$)/.test(u.pathname);
 const printify=/^[a-z0-9-]+\.printify\.me$/.test(u.hostname)&&/^\/product\/[^/]+/.test(u.pathname);
 return etsy||printify?u.href:'';
 }catch{return '';}
}
function margin({price,shippingCharged=0,production,shippingCost,laborCost=0,extraFeeRate=0,reserveRate=0.05}){
 const inputs=[price,shippingCharged,production,shippingCost,laborCost,extraFeeRate,reserveRate];
 if(inputs.some(x=>!Number.isFinite(x)||x<0)||extraFeeRate>1||reserveRate>1)throw new RangeError('Enter nonnegative amounts and rates between 0 and 1');
 const gross=price+shippingCharged,fees=gross*(0.065+0.03+extraFeeRate)+0.25+0.20,reserve=gross*reserveRate;
 return {gross,fees,reserve,profit:gross-production-shippingCost-laborCost-fees-reserve};
}
const api={MAX_SELECTIONS,normalizeCart,listingUrl,margin};
if(typeof module==='object'&&module.exports)module.exports=api;else root.HearthlineCore=api;
})(typeof window==='object'?window:globalThis);
