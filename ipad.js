const PRODUCTS = [
  {"id":1,"name":"iPad Pro (11\)","price":99900,"displayPrice":"₹99,900","img":"https://media.istockphoto.com/id/1180998013/photo/apple-ipad-pro-with-apple-pencil.jpg?s=612x612&w=0&k=20&c=aiyM-EbSK3gW_72F3MEOg_i_bI8Mc38L5s8tKX0Mjv0=","storage":["128GB","256GB","512GB","1TB","2TB"]},
  {"id":2,"name":"iPad Pro (13\)","price":129900,"displayPrice":"₹1,29,900","img":"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-silver-glossy-wifi_AV1_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=80&.v=YXpaUEtKWGhlNnNrVGZkTEo4T0xsNDByMHhIZkdBbFEwRFROUE9ubkFjTnBIK1RHU1d3MGRmSnYwdi9jcFlpOExCcE5mL2xwZUFLQWdLWWxPM1NucnRVRWVXSzdKNmQ4OUR2Q1RTYjk0V1lnK05jcGhxb0ZEQ0VxMXp5VmNrSEZ2UzgweTJPMTBoMjBsNDR0UU9hVzg1WlBTcW1DRytXSGM4OVFTYTJUYzFn&traceId=1","storage":["128GB","256GB","512GB","1TB","2TB"]},
  {"id":3,"name":"iPad Air","price":59900,"displayPrice":"₹59,900","img":"https://www.apple.com/v/ipad-air/ab/images/overview/hero/hero_endframe__fvm22b45e5me_large.png","storage":["64GB","256GB","512GB"]},
  {"id":4,"name":"iPad (10th gen)","price":34900,"displayPrice":"₹34,900","img":"https://m.media-amazon.com/images/I/61uA2UVnYWL.jpg","storage":["64GB","256GB"]},
  {"id":5,"name":"iPad mini","price":49900,"displayPrice":"₹49,900","img":"https://hips.hearstapps.com/hmg-prod/images/apple-ipad-mini-2024-review-lead-672a0d53e55b6.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*","storage":["64GB","256GB"]}
];

const $ = (sel, ctx=document)=>ctx.querySelector(sel);
const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

const root=document.documentElement;
const THEME_KEY="store_theme";

function applyTheme(theme){root.setAttribute("data-theme",theme);}
function loadTheme(){const saved=localStorage.getItem(THEME_KEY); if(saved) return applyTheme(saved); const prefersDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches; applyTheme(prefersDark?"dark":"light");}
function toggleTheme(){const current=root.getAttribute("data-theme"); const next=current==="dark"?"light":"dark"; applyTheme(next); localStorage.setItem(THEME_KEY,next);}

const searchBtn=$("#searchBtn");
const searchBar=$("#searchBar");
const searchInput=$("#searchInput");
const storageFilter=$("#storageFilter");
const priceSort=$("#priceSort");
const grid=$("#productGrid");

function toggleSearchBar(){const hidden=searchBar.hasAttribute("hidden"); if(hidden) searchBar.removeAttribute("hidden"); else {searchBar.setAttribute("hidden",""); searchInput.value="";} render();}
function getSearchQuery(){return (searchInput?.value||"").trim().toLowerCase();}
function filterProducts(list){const q=getSearchQuery(); const storage=storageFilter.value; return list.filter(p=>{const matchesText=!q||p.name.toLowerCase().includes(q); const matchesStorage=storage==="all"||(p.storage&&p.storage.includes(storage)); return matchesText&&matchesStorage;});}
function sortProducts(list){const mode=priceSort.value; if(mode==="low-high") return [...list].sort((a,b)=>a.price-b.price); if(mode==="high-low") return [...list].sort((a,b)=>b.price-a.price); return list;}
function storageButtons(p){if(!p.storage) return ''; return p.storage.map((s,idx)=>`<button class="storage-btn ${idx===0?'active':''}" data-id="${p.id}" data-storage="${s}">${s}</button>`).join('');}
function card(p){return `<article class="card" data-id="${p.id}"><img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy"/><div class="card-body"><h3 class="card-title">${p.name}</h3><div class="price">${p.displayPrice}</div><div class="storage" role="group" aria-label="Storage options">${storageButtons(p)}</div><div class="buy-row"><button class="buy-btn" data-id="${p.id}">Buy</button></div></div></article>`;}
function render(){const filtered=filterProducts(PRODUCTS); const sorted=sortProducts(filtered); grid.innerHTML=sorted.map(card).join('');}

document.addEventListener("click",(e)=>{const t=e.target;
  if(t.matches(".storage button, .storage-btn")){const id=Number(t.getAttribute("data-id")); const storage=t.getAttribute("data-storage"); const cardEl=t.closest(".card"); cardEl.querySelectorAll(".storage button, .storage-btn").forEach(b=>b.classList.remove("active")); t.classList.add("active"); cardEl.dataset.storage=storage;}
  if(t.matches(".buy-btn")){const id=Number(t.getAttribute("data-id")); const product=PRODUCTS.find(p=>p.id===id); const cardEl=t.closest(".card"); const chosen=cardEl.dataset.storage||(product.storage?product.storage[0]:'Default'); alert(`Added to Bag:\n${product.name} — ${chosen} — ${product.displayPrice}`);}
  if(t===searchBtn){toggleSearchBar();}
  if(t.id==="themeToggle"){toggleTheme();}
});

storageFilter.addEventListener("change",render);
priceSort.addEventListener("change",render);
searchInput?.addEventListener("input",render);
$("#year").textContent=new Date().getFullYear();
loadTheme();
render();

