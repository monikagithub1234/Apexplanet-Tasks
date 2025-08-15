// Category JS — rendering + interactions (based on your main.js)

const PRODUCTS = [
  {
    "id": 1,
    "name": "iPhone 15 Silicone Case with MagSafe – Light Pink",
    "price": 4900,
    "displayPrice": "₹4,900",
    "img": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTjBZQnbp1EDJ2a7qkJuWP8GYDqr6YiZavVsuYGnGwPJR1fMoJJMyOxh-u0JcNeeJ78WkDUth9kMP8KrQqlS3isiojTIzxKMzij_TfKuMF1JKO_yqzGEkt779o",
    "storage": null
  },
  {
    "id": 2,
    "name": "Apple Pencil (USB-C)",
    "price": 7900,
    "displayPrice": "₹7,900",
    "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MU8F2?wid=532&hei=582&fmt=jpeg&qlt=95&.v=1570490079304",
    "storage": null
  },
  {
    "id": 3,
    "name": "Smart Folio for iPad (10th generation) – White",
    "price": 8500,
    "displayPrice": "₹8,500",
    "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQDP3?wid=532&hei=582&fmt=jpeg&qlt=95&.v=1664481420471",
    "storage": null
  },
  {
    "id": 4,
    "name": "35W Dual USB-C Port Compact Power Adapter",
    "price": 5800,
    "displayPrice": "₹5,800",
    "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MNWP3?wid=532&hei=582&fmt=jpeg&qlt=95&.v=1653434841801",
    "storage": null
  },
  {
    "id": 5,
    "name": "MagSafe Charger",
    "price": 4500,
    "displayPrice": "₹4,500",
    "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MHXH3?wid=532&hei=582&fmt=jpeg&qlt=95&.v=1603838674000",
    "storage": null
  }
];

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const root = document.documentElement;
const THEME_KEY = "store_theme";

function applyTheme(theme) { root.setAttribute("data-theme", theme); }
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return applyTheme(saved);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}
function toggleTheme() {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

const searchBtn = $("#searchBtn");
const searchBar = $("#searchBar");
const searchInput = $("#searchInput");

function toggleSearchBar() {
  const hidden = searchBar.hasAttribute("hidden");
  if (hidden) searchBar.removeAttribute("hidden");
  else searchBar.setAttribute("hidden", "");
  if (!hidden) searchInput.value = "";
  render();
}

function getSearchQuery() { return (searchInput?.value || "").trim().toLowerCase(); }

const storageFilter = $("#storageFilter");
const priceSort = $("#priceSort");

function filterProducts(list) {
  const q = getSearchQuery();
  const storage = storageFilter.value;
  return list.filter(p => {
    const matchesText = !q || p.name.toLowerCase().includes(q);
    const matchesStorage = storage === "all" || (p.storage && p.storage.includes(storage));
    return matchesText && matchesStorage;
  });
}

function sortProducts(list) {
  const mode = priceSort.value;
  if (mode === "low-high") return [...list].sort((a,b)=>a.price-b.price);
  if (mode === "high-low") return [...list].sort((a,b)=>b.price-a.price);
  return list;
}

const grid = $("#productGrid");

function storageButtons(p) {
  if(!p.storage) return '';
  return p.storage.map((s, idx) => `
    <button class="storage-btn ${idx===0?'active':''}" data-id="${p.id}" data-storage="${s}">${s}</button>
  `).join('');
}

function card(p) {
  return `
    <article class="card" data-id="${p.id}">
      <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <div class="price">${p.displayPrice}</div>
        <div class="storage" role="group" aria-label="Storage options">
          ${storageButtons(p)}
        </div>
        <div class="buy-row">
          <button class="buy-btn" data-id="${p.id}">Buy</button>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const filtered = filterProducts(PRODUCTS);
  const sorted = sortProducts(filtered);
  grid.innerHTML = sorted.map(card).join('');
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.matches(".storage button, .storage-btn")) {
    const id = Number(t.getAttribute("data-id"));
    const storage = t.getAttribute("data-storage");
    const cardEl = t.closest(".card");
    cardEl.querySelectorAll(".storage button, .storage-btn").forEach(b=>b.classList.remove("active"));
    t.classList.add("active");
    cardEl.dataset.storage = storage;
  }
  if (t.matches(".buy-btn")) {
    const id = Number(t.getAttribute("data-id"));
    const product = PRODUCTS.find(p=>p.id===id);
    const cardEl = t.closest(".card");
    const chosen = cardEl.dataset.storage || (product.storage?product.storage[0]:'Default');
    alert(`Added to Bag:\n${product.name} — ${chosen} — ${product.displayPrice}`);
  }
  if (t === searchBtn) { toggleSearchBar(); }
  if (t.id === "themeToggle") { toggleTheme(); }
});

storageFilter.addEventListener("change", render);
priceSort.addEventListener("change", render);
searchInput?.addEventListener("input", render);
$("#year").textContent = new Date().getFullYear();
loadTheme();
render();

