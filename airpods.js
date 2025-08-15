const PRODUCTS = [
  {id:1,name:"AirPods (2nd generation)",price:14900,displayPrice:"₹14,900.00",img:"https://rukminim2.flixcart.com/image/1200/1200/kpinwy80/headphone/x/r/e/mmef2hn-a-apple-original-imag3qe9hphsevrt.jpeg",storage:null},
  {id:2,name:"AirPods (3rd generation)",price:19900,displayPrice:"₹19,900.00",img:"https://bhatiamobile.com/wp-content/uploads/2023/07/Apple-AirPods-3rd-Generation_1-600x600.jpg.webp",storage:null},
  {id:3,name:"AirPods Pro (2nd generation)",price:24900,displayPrice:"₹24,900.00",img:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=WTk1dTl5UTBnZXdKN2tua2pFb1hvQ3hmVXd6RnorM2pzUlRIKzNkUEN0UjUvWUFQTXRnUEZqWWRRU2d1WFJwZlcrN05qS3VEVG0zVXZGNUlPVjFnM0RNZGEwYVUyTzcvZlg1UkxwTzJQS1U4K1JOcE5YME4zSHVzMkxMK0ZjVTI",storage:null},
  {id:4,name:"AirPods Max — Silver",price:59900,displayPrice:"₹59,900.00",img:"https://m.media-amazon.com/images/I/81thV7SoLZL._UF1000,1000_QL80_.jpg",storage:null},
  {id:5,name:"AirPods Max — Space Grey",price:59900,displayPrice:"₹59,900.00",img:"https://m.media-amazon.com/images/I/81jqUPkIVRL._UF1000,1000_QL80_.jpg",storage:null}
];

const $ = (sel, ctx=document) => ctx.querySelector(sel);
const root = document.documentElement;
const THEME_KEY = "store_theme";

function applyTheme(theme){ root.setAttribute("data-theme",theme); }
function loadTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved) return applyTheme(saved);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark":"light");
}
function toggleTheme(){
  const current = root.getAttribute("data-theme");
  const next = current==="dark"?"light":"dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY,next);
}

const searchBtn = $("#searchBtn");
const searchBar = $("#searchBar");
const searchInput = $("#searchInput");
const priceSort = $("#priceSort");
const grid = $("#productGrid");

function toggleSearchBar(){
  const hidden = searchBar.hasAttribute("hidden");
  if(hidden) searchBar.removeAttribute("hidden");
  else{ searchBar.setAttribute("hidden",""); searchInput.value=""; }
  render();
}

function getSearchQuery(){ return (searchInput?.value||"").trim().toLowerCase(); }

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

function card(p){
  return `
    <article class="card" data-id="${p.id}">
      <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <div class="price">${p.displayPrice}</div>
        <div class="buy-row">
          <button class="buy-btn" data-id="${p.id}">Buy</button>
        </div>
      </div>
    </article>
  `;
}

function render(){
  const filtered = filterProducts(PRODUCTS);
  const sorted = sortProducts(filtered);
  grid.innerHTML = sorted.map(card).join('');
}

document.addEventListener("click",(e)=>{
  const t = e.target;
  if(t===searchBtn) toggleSearchBar();
  if(t.id==="themeToggle") toggleTheme();
  if(t.matches(".buy-btn")){
    const id = Number(t.dataset.id);
    const product = PRODUCTS.find(p=>p.id===id);
    alert(`Added to Bag:\n${product.name} — ${product.displayPrice}`);
  }
});

searchInput?.addEventListener("input",render);
priceSort.addEventListener("change",render);

loadTheme();
$("#year").textContent = new Date().getFullYear();
render();
