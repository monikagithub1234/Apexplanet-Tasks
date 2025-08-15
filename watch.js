
const PRODUCTS = [
  {id:1, name:"Apple Watch Series 10", price:46900, displayPrice:"₹46,900", img:"https://m.media-amazon.com/images/I/61I431q8rhL.jpg", storage:null},
  {id:2, name:"Apple Watch Ultra 2", price:89900, displayPrice:"₹89,900", img:"https://www.apple.com/in/apple-watch-ultra-2/images/overview/hero/hero_endframe__b7prz1z3rs2u_large.jpg", storage:null},
  {id:3, name:"Apple Watch SE", price:24900, displayPrice:"₹24,900", img:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYG03ref_FV98_VW_34FR+watch-case-44-aluminum-midnight-nc-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=OUh6OFdFVEJxVkF6SUo5TWxpTE50MG5TeWJ6QW43NUFnQ2V4cmRFc1VnWWxvMTNVeXVWaTk0Ui9PSEVKVVU0dzN2QVRTWW5kR2Jad3ptYU8zZ21EUWZmQXlUU2xCQ2pTN3lrcDE0UU1hK0ZpRFN2VTEyRk9ZNEFubk9kM01kUmIySDNGVkFuTWJDdzY3LzhwNXhBeGd1SGpaRFFxc2owYmpHVDUzTnBBbHhWTGczaFhEVzlIZ1ZNWGl6QUFCWE5OZ1JNaDBKYVhZeVUreEN5elJpM3E3QQ", storage:null},
  {id:4, name:"Apple Watch Series 9", price:41900, displayPrice:"₹41,900", img:"https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-silver-aluminum-Solo-Loop-olive-230912_inline.jpg.large.jpg", storage:null},
  {id:5, name:"Apple Watch Nike Edition", price:47900, displayPrice:"₹47,900", img:"https://bpremio.in/wp-content/uploads/2022/11/71S6CQmCTsL._SL1500_.jpg", storage:null}
];

// DOM helpers
const $ = (sel, ctx=document)=>ctx.querySelector(sel);
const root = document.documentElement;
const searchBtn = $("#searchBtn");
const searchBar = $("#searchBar");
const searchInput = $("#searchInput");
const priceSort = $("#priceSort");
const grid = $("#productGrid");
const THEME_KEY = "store_theme";

// Theme
function applyTheme(theme){ root.setAttribute("data-theme", theme); }
function loadTheme(){ 
  const saved = localStorage.getItem(THEME_KEY); 
  if(saved) return applyTheme(saved); 
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark?"dark":"light");
}
function toggleTheme(){
  const current = root.getAttribute("data-theme");
  const next = current==="dark"?"light":"dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY,next);
}

// Search toggle
function toggleSearchBar(){
  const hidden = searchBar.hasAttribute("hidden");
  if(hidden) searchBar.removeAttribute("hidden");
  else { searchBar.setAttribute("hidden",""); searchInput.value=""; }
  render();
}

// Filter & Sort
function getSearchQuery(){ return (searchInput.value||"").trim().toLowerCase(); }
function filterProducts(list){
  const q = getSearchQuery();
  return list.filter(p => !q || p.name.toLowerCase().includes(q));
}
function sortProducts(list){
  const mode = priceSort.value;
  if(mode==="low-high") return [...list].sort((a,b)=>a.price-b.price);
  if(mode==="high-low") return [...list].sort((a,b)=>b.price-a.price);
  return list;
}

// Product card
function card(p){
  return `<article class="card" data-id="${p.id}">
    <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy"/>
    <div class="card-body">
      <h3 class="card-title">${p.name}</h3>
      <div class="price">${p.displayPrice}</div>
      <div class="buy-row"><button class="buy-btn" data-id="${p.id}">Buy</button></div>
    </div>
  </article>`;
}

// Render
function render(){
  const filtered = filterProducts(PRODUCTS);
  const sorted = sortProducts(filtered);
  grid.innerHTML = sorted.map(card).join('');
}

// Event delegation
document.addEventListener("click", e=>{
  const t = e.target;
  if(t===searchBtn) toggleSearchBar();
  if(t.id==="themeToggle") toggleTheme();
  if(t.matches(".buy-btn")){
    const id = Number(t.dataset.id);
    const product = PRODUCTS.find(p=>p.id===id);
    alert(`Added to Bag:\n${product.name} — ${product.displayPrice}`);
  }
});

searchInput.addEventListener("input", render);
priceSort.addEventListener("change", render);

// Footer year
$("#year").textContent = new Date().getFullYear();

// Init
loadTheme();
render();
