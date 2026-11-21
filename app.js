const IM={"bloom": ["assets/bloom-1.webp", "assets/bloom-2.webp", "assets/bloom-3.webp"], "flora": ["assets/flora-1.webp", "assets/flora-2.webp", "assets/flora-3.webp"]};
let cur;
const P=[
{id:'bloom',en:'Bloom',ar:'بلوم',c:'open',p:580,im:IM.bloom,d:'Rich in color, joyful in detail. A statement abaya embroidered with florals that bring softness and vibrance to every step.',da:'غنيّة بالألوان، مبهجة بالتفاصيل. عباية مميزة مطرّزة بالورود تمنح كل خطوة نعومة وحيوية.'},
{id:'flora',en:'Flora',ar:'فلورا',c:'open',p:520,im:IM.flora,d:'Delicate florals, airy movement, and a shade of blue that feels like calm.',da:'ورود رقيقة وانسيابية خفيفة ودرجة من الأزرق تبعث على الهدوء.'},
{id:'layali',en:'Layali evening abaya',ar:'ليالي – عباية سهرة',c:'occasion',p:590},
{id:'rimal',en:'Rimal belted abaya',ar:'رمال – عباية بحزام',c:'open',p:490},
{id:'hayat',en:'Hayat kaftan abaya',ar:'حياة – عباية كفتان',c:'closed',p:450},
{id:'dana',en:'Dana embroidered abaya',ar:'دانة – عباية مطرّزة',c:'occasion',p:560}];
const F=[['all','All','كل القطع'],['open','Open','مفتوحة'],['closed','Closed','مغلقة'],['occasion','Occasion','مناسبات']];
let cart=[],flt='all',srt='f';
try{cart=JSON.parse(localStorage.getItem('fc'))}catch(e){}
cart=(Array.isArray(cart)?cart:[]).filter(c=>c&&P.some(x=>x.id==c.id)).map(c=>({id:c.id,len:c.len,q:c.q||1}));
const WA='https://wa.me/971500000000';
const qty=()=>cart.reduce((a,c)=>a+c.q,0),total=()=>cart.reduce((a,c)=>a+P.find(x=>x.id==c.id).p*c.q,0);
const $=s=>document.querySelector(s);
const t=(e,a)=>`<span class="en">${e}</span><span class="ar">${a}</span>`;
const price=n=>t('AED '+n.toLocaleString('en'),n.toLocaleString('ar-EG')+' د.إ');
const img=(i,c='')=>`<div class="img ${c}" style="--c:var(--t${i%3})"><svg viewBox="0 0 264 274" aria-hidden="true"><use href="#lm"/></svg></div>`;
const ph=(a,b)=>`<div class="img"><img src="${a}" alt="" loading="lazy" decoding="async"><img class="h" src="${b}" alt="" loading="lazy" decoding="async"></div>`;
const tile=(p,i)=>`<a class="tile" href="#piece-${p.id}">${p.im?ph(p.im[0],p.im[1]):img(i)}<h3>${t(p.en,p.ar)}</h3><p>${price(p.p)}</p></a>`;
function shop(){
 const so=[['f','Featured · المميزة'],['lo','Price: low to high · السعر تصاعدياً'],['hi','Price: high to low · السعر تنازلياً']];
 $('#fl').innerHTML=F.map(f=>`<button aria-pressed="${flt==f[0]}" onclick="flt='${f[0]}';shop()">${t(f[1],f[2])}</button>`).join('')+`<select class="srt" aria-label="Sort" onchange="srt=this.value;shop()">${so.map(x=>`<option value="${x[0]}"${srt==x[0]?' selected':''}>${x[1]}</option>`).join('')}</select>`;
 const a=P.map((p,i)=>[p,i]).filter(x=>flt=='all'||x[0].c==flt);
 if(srt=='lo')a.sort((x,y)=>x[0].p-y[0].p);if(srt=='hi')a.sort((x,y)=>y[0].p-x[0].p);
 $('#sg').innerHTML=a.map(x=>tile(x[0],x[1])).join('');
}
function piece(id){
 const p=P.find(x=>x.id==id)||P[0],i=P.indexOf(p);cur=p;
 const g=p.im?`<div class="img big zoom" onclick="zm(event)" onmousemove="mv(event)"><img id="mi" src="${p.im[0]}" alt="${p.en}"></div><div class="thumbs t3">${p.im.map((x,k)=>`<button class="img th" onclick="PI(${k})" aria-label="Photo ${k+1}"><img src="${x}" alt="" loading="lazy"></button>`).join('')}</div>`:`${img(i,'big')}<div class="thumbs">${img(i+1)}${img(i+2)}</div>`;
 const rel=P.filter(x=>x!=p).slice(0,3).map(x=>tile(x,P.indexOf(x))).join('');
 $('#pc').innerHTML=`<div class="pd"><div>${g}</div><div class="info"><h1>${t(p.en,p.ar)}</h1>
 <p class="pr">${price(p.p)} <small>${t('VAT included','شامل الضريبة')}</small></p>
 <p>${p.d?t(p.d,p.da):t('A relaxed, floor-length silhouette with soft sleeves and a clean hem.','قصّة مريحة بطول الأرض مع أكمام ناعمة وحافة نظيفة.')}</p>
 <fieldset><legend>${t('Size','المقاس')}<a class="sz" href="#size" onclick="openSz(event)">${t('Size guide','دليل المقاسات')}</a></legend>${['XS','S','M','L','XL'].map((n,k)=>`<label><input type="radio" name="len" value="${n}"${k==2?' checked':''}><span>${n}</span></label>`).join('')}</fieldset>
 <button class="btn" id="addb" onclick="add('${p.id}')">${t('Add to bag','أضف إلى السلة')}</button>
 <details open><summary>${t('Fabric and care','القماش والعناية')}</summary><p>${t('Lightweight crepe with a soft drape. Cold hand wash or dry clean.','كريب خفيف بانسدال ناعم. غسيل يدوي بارد أو تنظيف جاف.')}</p></details>
 <details><summary>${t('Delivery','التوصيل')}</summary><p>${t('Free delivery across the UAE in 1–3 days. GCC shipping is calculated at checkout.','توصيل مجاني داخل الإمارات خلال ١–٣ أيام. يُحسب الشحن لدول الخليج عند إتمام الطلب.')}</p></details>
 <details><summary>${t('Exchanges','التبديل')}</summary><p>${t('Exchange within 3 days of delivery, in original condition. No refunds.','التبديل خلال ٣ أيام من الاستلام وبحالة المنتج الأصلية. لا يوجد استرداد.')} <a href="#policy">${t('Exchange policy','شروط الاستبدال')}</a></p></details></div></div>
 <h2>${t('You may also like','قد يعجبك أيضاً')}</h2><div class="grid rel">${rel}</div>
 <div class="stk" id="stk"><span>${price(p.p)}</span><button class="btn" onclick="add('${p.id}')">${t('Add to bag','أضف إلى السلة')}</button></div>`;
 new IntersectionObserver(([x])=>$('#stk').classList.toggle('on',!x.isIntersecting&&x.boundingClientRect.top<0)).observe($('#addb'));
}
const esc=x=>x.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fld=(id,en,ar,ty='text',rq=1,ac='')=>`<label class="f"><span>${t(en,ar)}</span><input id="${id}" type="${ty}"${rq?' required':''} autocomplete="${ac}"></label>`;
function checkout(){
 const sum=total(),T=t('Checkout','إتمام الطلب');
 if(!cart.length){$('#co').innerHTML=`<div class="done"><h1>${t('Your bag is empty.','سلتك فارغة.')}</h1><p></p><a class="btn" href="#shop">${t('Shop the collection','تسوق المجموعة')}</a></div>`;return}
 const em=['Abu Dhabi · أبوظبي','Dubai · دبي','Sharjah · الشارقة','Ajman · عجمان','Umm Al Quwain · أم القيوين','Ras Al Khaimah · رأس الخيمة','Fujairah · الفجيرة'];
 const vat=Math.round(sum/21*100)/100;
 const pay=[['Credit or debit card','بطاقة ائتمان أو خصم','You will be taken to a secure payment page.','ستنتقل إلى صفحة دفع آمنة.'],['Pay in instalments','قسّط مشترياتك','With Tabby or Tamara.','عبر تابي أو تمارا.'],['Cash on delivery','الدفع عند الاستلام','Pay when your order arrives.','ادفع عند وصول طلبك.']];
 $('#co').innerHTML=`<h1 class="ct">${T}</h1><div class="co"><form id="cf" onsubmit="placeOrder(event)">
 <h2>${t('Contact','معلومات التواصل')}</h2>${fld('em','Email','البريد الإلكتروني','email',1,'email')}${fld('ph','Mobile number (+971)','رقم الجوال (+971)','tel',1,'tel')}
 <h2>${t('Delivery','التوصيل')}</h2>${fld('nm','Full name','الاسم الكامل','text',1,'name')}
 <label class="f"><span>${t('Emirate','الإمارة')}</span><select id="emr" required><option value="" disabled selected>${t('Select','اختر')}</option>${em.map(x=>`<option>${x}</option>`).join('')}</select></label>
 ${fld('ad','Area and street','المنطقة والشارع','text',1,'address-line1')}
 <div class="row">${fld('ap','Building or apartment','المبنى أو الشقة','text',1,'address-line2')}${fld('nt','Delivery notes (optional)','ملاحظات التوصيل (اختياري)','text',0)}</div>
 <h2>${t('Payment','الدفع')}</h2>${pay.map((x,k)=>`<label class="pay"><input type="radio" name="pay"${k?'':' checked'}><span>${t(x[0],x[1])}<small>${t(x[2],x[3])}</small></span></label>`).join('')}
 <p style="margin:1rem 0 1.5rem;font-size:.85rem">${t('Demo only: no payment is taken.','نسخة تجريبية: لا يتم سحب أي مبلغ.')}</p>
 <button class="btn" type="submit">${t('Place order','إتمام الشراء')}</button></form>
 <aside class="sum"><h2 style="margin-top:0">${t('Order summary','ملخص الطلب')}</h2><ul>${cart.map((c,k)=>{const p=P.find(x=>x.id==c.id);return `<li><span class="mini">${p.im?`<img src="${p.im[0]}" alt="">`:''}</span><div>${t(p.en,p.ar)}<br><small>${t('Size ','المقاس ')}${c.len}</small>${stp(k)}</div><div>${price(p.p*c.q)}<br><button class="lk" type="button" onclick="qn(${k},-9)">${t('Remove','إزالة')}</button></div></li>`}).join('')}</ul>
 <div class="tot"><span>${t('Subtotal','المجموع الفرعي')}</span><span>${price(sum)}</span></div>
 <div class="tot"><span>${t('Delivery','التوصيل')}</span><span>${t('Free','مجاني')}</span></div>
 <div class="tot" style="font-size:1.2rem"><span>${t('Total','الإجمالي')}</span><span>${price(sum)}</span></div>
 <small>${t('Includes VAT of AED '+vat.toLocaleString('en'),'يشمل ضريبة القيمة المضافة '+vat.toLocaleString('ar-EG')+' د.إ')}</small></aside></div>`;
}
function placeOrder(e){
 e.preventDefault();const nm=esc($('#nm').value.trim().split(' ')[0]),no='FURL-'+Math.floor(10000+Math.random()*90000);
 cart=[];drawCart();
 $('#co').innerHTML=`<div class="done"><h1>${t('Thank you, '+nm+'.','شكراً '+nm+'.')}</h1><p>${t('Your order '+no+' has been received. This is a demo, so no payment was taken.','تم استلام طلبك '+no+'. هذه نسخة تجريبية، لذلك لم يتم سحب أي مبلغ.')}</p><a class="btn" href="#shop">${t('Continue shopping','تابع التسوق')}</a></div>`;scrollTo(0,0);
}
function PI(k){$('#mi').src=cur.im[k]}
function mv(e){const b=e.currentTarget,r=b.getBoundingClientRect();b.style.setProperty('--x',(e.clientX-r.left)/r.width*100+'%');b.style.setProperty('--y',(e.clientY-r.top)/r.height*100+'%')}
function zm(e){mv(e);e.currentTarget.classList.toggle('z')}
function openSz(e){e.preventDefault();$('#sgb').innerHTML=$('#pg-size .tw').outerHTML+$('#pg-size .note').outerHTML;$('#sz').showModal()}
function drawCart(){
 try{localStorage.setItem('fc',JSON.stringify(cart))}catch(e){}
 $('#cnt').textContent=qty();
 $('#items').innerHTML=cart.length?cart.map((c,k)=>{const p=P.find(x=>x.id==c.id);return `<li><span class="mini">${p.im?`<img src="${p.im[0]}" alt="">`:''}</span><div>${t(p.en,p.ar)}<br><small>${t('Size ','المقاس ')}${c.len}</small>${stp(k)}</div><div>${price(p.p*c.q)}<br><button class="lk" onclick="qn(${k},-9)">${t('Remove','إزالة')}</button></div></li>`}).join(''):`<li class="em">${t('Your bag is empty.','سلتك فارغة.')}</li>`;
 $('#sub').innerHTML=price(total());
}
const stp=k=>`<div class="qt"><button aria-label="Less" onclick="qn(${k},-1)">−</button><span>${cart[k].q}</span><button aria-label="More" onclick="qn(${k},1)">+</button></div>`;
function qn(k,d){cart[k].q+=d;if(cart[k].q<1)cart.splice(k,1);drawCart();if(location.hash=='#checkout')checkout()}
function add(id){const l=document.querySelector('input[name=len]:checked').value,c=cart.find(x=>x.id==id&&x.len==l);c?c.q++:cart.push({id,len:l,q:1});drawCart();openCart()}
function openCart(){$('#cart').classList.add('open')}
function closeCart(){$('#cart').classList.remove('open')}
document.addEventListener('keydown',e=>{if(e.key=='Escape')closeCart()});
let trail=[];
function goBack(){trail.pop();location.hash=trail[trail.length-1]||'home'}
function route(){
 const h=location.hash.slice(1)||'home',[r,id]=h.split('-');
 const q=trail.indexOf(h);if(q>=0)trail.length=q+1;else trail.push(h);
 const k=['shop','piece','story','size','policy','checkout'].includes(r)?r:'home';document.body.classList.toggle('home',k=='home');document.body.classList.toggle('pc',k=='piece');
 document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id=='pg-'+k));
 if(k=='checkout')checkout();if(k=='shop'){flt=F.some(f=>f[0]==id)?id:'all';shop()}if(k=='piece')piece(id);
 closeCart();
 if(h=='about')$('#about').scrollIntoView();else scrollTo(0,0);
}
function setLang(l){
 const d=document.documentElement;d.lang=l;d.dir=l=='ar'?'rtl':'ltr';
 try{localStorage.setItem('l',l)}catch(e){}
 $('#lt').textContent=l=='ar'?'English':'عربي';
 $('#em').placeholder=l=='ar'?'بريدك الإلكتروني':'Your email';
}
$('#lt').onclick=()=>setLang(document.documentElement.lang=='ar'?'en':'ar');
$('#sb').onclick=()=>{$('#sb').innerHTML=t('Thank you','شكراً')};
$('#feat').innerHTML=P.slice(0,3).map(tile).join('');
$('#cats').innerHTML=[['open','Open abaya','عباية مفتوحة'],['closed','Closed abaya','عباية مغلقة'],['occasion','Occasion','مناسبات']].map((c,k)=>`<a class="tile" href="#shop-${c[0]}">${k?img(k+1):ph(IM.bloom[2],IM.bloom[2])}<h3>${t(c[1],c[2])}</h3></a>`).join('');
$('#lb').innerHTML=[IM.bloom[1],IM.flora[0],IM.bloom[2],IM.flora[1],IM.bloom[0],IM.flora[2]].map(x=>`<div class="img"><img src="${x}" alt="FURL lookbook" loading="lazy" decoding="async"></div>`).join('');
document.querySelectorAll('[data-wa]').forEach(a=>a.href=WA);
let s='en';try{s=localStorage.getItem('l')||'en'}catch(e){}
setLang(s);drawCart();route();
const sv=$('#sv');sv.muted=true;if(!matchMedia('(prefers-reduced-motion:reduce)').matches)new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting?sv.play().catch(()=>{}):sv.pause()),{threshold:.35}).observe(sv);
const hv=$('#hv');hv.muted=true;if(matchMedia('(prefers-reduced-motion:reduce)').matches){hv.removeAttribute('autoplay');hv.pause()}else{hv.play().catch(()=>{});if(matchMedia('(min-aspect-ratio:1/1)').matches){const bg=$('.vbg');bg.src=hv.src;bg.muted=true;bg.play().catch(()=>{})}}
addEventListener('hashchange',route);