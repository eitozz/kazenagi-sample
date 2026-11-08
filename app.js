'use strict';
const bootstrap=window.SAMPLE_BOOTSTRAP||{};
const dayMeta=bootstrap.dayMeta||{dates:['2027-04-14','2027-04-15','2027-04-16','2027-04-17'],dateLabels:['4月14日（水）','4月15日（木）','4月16日（金）','4月17日（土）'],names:['風凪','丘の庭園','工房通り','帰路']};
const tripDays=((bootstrap.content&&bootstrap.content.tripDays)||[{events:[]},{events:[]},{events:[]},{events:[]}]).map((day,index)=>({
  ...day,date:dayMeta.dates[index],dateLabel:dayMeta.dateLabels[index],name:dayMeta.names[index],
  events:(day.events||[]).map((event,eventIndex)=>[...event.slice(0,4),event[4]||`d${index}-e${eventIndex}`])
}));
const photoOverrides=(bootstrap.content&&bootstrap.content.photos)||{};
function photoOverride(file){const photo=photoOverrides[file];return photo&&/^\/media\/[0-9a-f-]{36}$/.test(photo.url)?photo:null}
function photoSource(file){return photoOverride(file)?.url||`assets/${file}`}

const menuButton=document.querySelector('.menu-button');
const mobileNav=document.querySelector('.mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','メニューを開く');menuButton.querySelector('.menu-plus').textContent='＋'}
menuButton.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');menuButton.querySelector('.menu-plus').textContent=open?'−':'＋'});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});

const packKey='fictional-journey-packing-v1';
let packed={};let storageAvailable=true;
try{const saved=JSON.parse(localStorage.getItem(packKey)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))packed=saved}catch{storageAvailable=false}
const packInputs=[...document.querySelectorAll('[data-pack]')];
packInputs.forEach(input=>{input.checked=packed[input.dataset.pack]===true});
function updatePacking(save=true){
 let count=0;
 packInputs.forEach(input=>{packed[input.dataset.pack]=input.checked;if(input.checked)count++});
 document.querySelector('#pack-count').textContent=`${count} / ${packInputs.length}`;
 const progress=document.querySelector('.progress-line');progress.setAttribute('aria-valuenow',String(count));progress.querySelector('span').style.width=`${count/packInputs.length*100}%`;
 if(save){try{localStorage.setItem(packKey,JSON.stringify(packed));storageAvailable=true}catch{storageAvailable=false}}
 document.querySelector('#save-message').textContent=storageAvailable?'':'このブラウザでは保存できません。チェックはページを開いている間だけ有効です。';
}
packInputs.forEach(input=>input.addEventListener('change',()=>updatePacking()));
document.querySelector('#reset-pack').addEventListener('click',()=>{packInputs.forEach(input=>input.checked=false);updatePacking()});
updatePacking(false);
function updateToday(){
 const jpToday=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const remain=Math.round((Date.parse('2027-04-14T00:00:00+09:00')-Date.parse(`${jpToday}T00:00:00+09:00`))/86400000);
 const label=document.querySelector('#countdown');
 if(remain>0)label.textContent=`あと${remain}日`;
 else if(jpToday<='2027-04-17'){const index=tripDays.findIndex(day=>day.date===jpToday);label.textContent=index>=0?`旅の${index+1}日目`:'旅の記録'}
 else label.textContent='旅の記録';
}
updateToday();

/* --- Reconstructed for the GitHub Pages migration ---
   In the original site the day-tab switching lived in an inline script
   inside index.html (app.js itself contains no tab code). It is kept
   here so the migrated copy keeps the same behaviour. */
const tabButtons=[...document.querySelectorAll('.day-tabs button')];
const dayPanels=[...document.querySelectorAll('.day-panel')];
function selectDay(index){
 tabButtons.forEach((button,i)=>button.setAttribute('aria-selected',String(i===index)));
 dayPanels.forEach((panel,i)=>{panel.hidden=i!==index});
}
tabButtons.forEach((button,index)=>button.addEventListener('click',()=>selectDay(index)));
if(tabButtons.length&&dayPanels.length)selectDay(0);
const printButton=document.querySelector('.text-button');
if(printButton)printButton.addEventListener('click',()=>window.print());
