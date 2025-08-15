
const PRODUCTS = [
  {id:1,name:"MacBook Air (13\)",price:99900,displayPrice:"₹99,900",img:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-og-202503?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1739216814915",storage:["256GB","512GB","1TB"]},
  {id:2,name:"MacBook Air (15\)",price:124900,displayPrice:"₹1,24,900",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQOyk8ydDkSIgU46ePCKpSliGhxo7tgQ5AuA&s",storage:["256GB","512GB","1TB"]},
  {id:3,name:"MacBook Pro (14\)",price:169900,displayPrice:"₹1,69,900",img:"https://lapshop07.com/wp-content/uploads/2025/03/IMG-20250221-WA0002.jpg",storage:["512GB","1TB","2TB"]},
  {id:4,name:"MacBook Pro (16\)",price:229900,displayPrice:"₹2,29,900",img:"https://m.media-amazon.com/images/I/61Ph34V0YAL.jpg",storage:["512GB","1TB","2TB"]},
  {id:5,name:"iMac (24\")",price:134900,displayPrice:"₹1,34,900",img:"https://media.gettyimages.com/id/1244448751/photo/a-24-inch-apple-imac-m1-desktop-computer-taken-on-may-28-2021.jpg?s=612x612&w=gi&k=20&c=xE6pIPjk9Iwi45t2p5AvLhRN1Jrc9KW7rGQcJT8RfpY=",storage:["256GB","512GB"]},
  {id:6,name:"Mac mini",price:59900,displayPrice:"₹59,900",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZhdsaw96t14AbC2UGf7x7qtE98YDH62A7Kw&s",storage:["256GB","512GB"]},
  {id:7,name:"Mac Studio",price:214900,displayPrice:"₹2,14,900",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPoELon0k5W_IuLk856QuaIltpzsOA0Iid3g&s",storage:["1TB","2TB","4TB"]}
];


const $ = (sel, ctx=document) => ctx.querySelector(sel);
const root = document.documentElement;
const THEME_KEY = "store_theme";

// Theme
function applyTheme(theme){ root.setAttribute("data-theme", theme); }
function loadTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved) return applyTheme(saved);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark?"dark":"light");
}
function toggleTheme(){
  const current = root.getAttribute("data-theme");
  const next = current==="dark"?"light":"dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY,next);
}

// DOM
const searchBtn = $("#searchBtn");
const searchBar = $("#searchBar");
const searchInput = $("#searchInput");
const storageFilter = $("#storageFilter");
const priceSort = $("#priceSort");
const grid = $("#productGrid");

// Search bar toggle
searchBtn.addEventListener("click", ()=>{
  const hidden = searchBar.hasAttribute("hidden");
  if(hidden) searchBar.removeAttribute("hidden");
  else{ searchBar.setAttribute("hidden",""); searchInput.value=""; }
  render();
});

// Filters & theme
searchInput.addEventListener("input", render);
storageFilter.addEventListener("change", render);
priceSort.addEventListener("change", render);
$("#themeToggle").addEventListener("click", toggleTheme);

// Helpers
function getSearchQuery(){ return (searchInput.value || "").trim().toLowerCase(); }
function filterProducts(list){
  const q = getSearchQuery();
  const storage = storageFilter.value;
  return list.filter(p=>{
    const matchesText = !q || p.name.toLowerCase().includes(q);
    const matchesStorage = storage==="all" || (p.storage && p.storage.includes(storage));
    return matchesText && matchesStorage;
  });
}
function sortProducts(list){
  const mode = priceSort.value;
  if(mode==="low-high") return [...list].sort((a,b)=>a.price-b.price);
  if(mode==="high-low") return [...list].sort((a,b)=>b.price-a.price);
  return list;
}
function storageButtons(p){
  if(!p.storage) return '';
  return p.storage.map((s,idx)=>`<button class="storage-btn ${idx===0?'active':''}" data-id="${p.id}" data-storage="${s}">${s}</button>`).join('');
}
function card(p){
  return `<article class="card" data-id="${p.id}">
    <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy">
    <div class="card-body">
      <h3 class="card-title">${p.name}</h3>
      <div class="price">${p.displayPrice}</div>
      <div class="storage">${storageButtons(p)}</div>
      <div class="buy-row"><button class="buy-btn" data-id="${p.id}">Buy</button></div>
    </div>
  </article>`;
}
function render(){
  const filtered = filterProducts(PRODUCTS);
  const sorted = sortProducts(filtered);
  grid.innerHTML = sorted.map(card).join('');
}

// Event delegation for storage & buy
document.addEventListener("click", e=>{
  const t = e.target;
  if(t.matches(".storage-btn")){
    const cardEl = t.closest(".card");
    cardEl.querySelectorAll(".storage-btn").forEach(b=>b.classList.remove("active"));
    t.classList.add("active");
    cardEl.dataset.storage = t.dataset.storage;
  }
  if(t.matches(".buy-btn")){
    const id = Number(t.dataset.id);
    const product = PRODUCTS.find(p=>p.id===id);
    const cardEl = t.closest(".card");
    const chosen = cardEl.dataset.storage || (product.storage?product.storage[0]:'Default');
    alert(`Added to Bag:\n${product.name} — ${chosen} — ${product.displayPrice}`);
  }
});

// Footer year
$("#year").textContent = new Date().getFullYear();

// Init
loadTheme();
render();
