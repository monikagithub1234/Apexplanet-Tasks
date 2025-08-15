// // ================= PRODUCTS =================
// const PRODUCTS = [
//   { id: 1, name: "iPhone 16 Pro Max", price: 159900, displayPrice: "₹1,59,900", img: "images/iphone-16-pro-max.png", storage: ["256GB","512GB","1TB"] },
//   { id: 2, name: "iPhone 16 Pro", price: 139900, displayPrice: "₹1,39,900", img: "images/iphone-16-pro.png", storage: ["256GB","512GB","1TB"] },
//   { id: 3, name: "iPhone 16 Plus", price: 89900, displayPrice: "₹89,900", img: "images/iphone-16-plus.png", storage: ["128GB","256GB","512GB"] },
//   { id: 4, name: "iPhone 16", price: 79900, displayPrice: "₹79,900", img: "images/iphone-16.png", storage: ["128GB","256GB","512GB"] },
//   { id: 5, name: "iPhone 15", price: 69900, displayPrice: "₹69,900", img: "images/iphone-15.png", storage: ["128GB","256GB","512GB"] },
//   { id: 6, name: "iPhone 15 Plus", price: 79900, displayPrice: "₹79,900", img: "images/iphone-15-plus.png", storage: ["128GB","256GB","512GB"] },
//   { id: 7, name: "iPhone 14", price: 69900, displayPrice: "₹69,900", img: "images/iphone-14.png", storage: ["128GB","256GB"] },
//   { id: 8, name: "iPhone 13", price: 59900, displayPrice: "₹59,900", img: "images/iphone-13.png", storage: ["128GB","256GB"] },
//   { id: 9, name: "iPhone SE", price: 49900, displayPrice: "₹49,900", img: "images/iphone-se.png", storage: ["64GB","128GB","256GB"] },
// ];

// // ================= UTILITIES =================
// const $ = (sel, ctx = document) => ctx.querySelector(sel);
// const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// // ================= THEME TOGGLE =================
// const root = document.documentElement;
// const THEME_KEY = "store_theme";

// function applyTheme(theme) {
//   root.setAttribute("data-theme", theme);
// }
// function loadTheme() {
//   const saved = localStorage.getItem(THEME_KEY);
//   if (saved) return applyTheme(saved);
//   const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
//   applyTheme(prefersDark ? "dark" : "light");
// }
// function toggleTheme() {
//   const current = root.getAttribute("data-theme");
//   const next = current === "dark" ? "light" : "dark";
//   applyTheme(next);
//   localStorage.setItem(THEME_KEY, next);
// }

// // ================= SEARCH =================
// const searchBtn = $("#searchBtn");
// const searchBar = $("#searchBar");
// const searchInput = $("#searchInput");

// function toggleSearchBar() {
//   const hidden = searchBar.hasAttribute("hidden");
//   if (hidden) searchBar.removeAttribute("hidden");
//   else searchBar.setAttribute("hidden", "");
//   if (!hidden) searchInput.value = "";
//   render();
// }
// function getSearchQuery() {
//   return (searchInput?.value || "").trim().toLowerCase();
// }

// // ================= FILTERS & SORT =================
// const storageFilter = $("#storageFilter");
// const priceSort = $("#priceSort");

// function filterProducts(list) {
//   const q = getSearchQuery();
//   const storage = storageFilter.value;
//   return list.filter(p => {
//     const matchesText = !q || p.name.toLowerCase().includes(q);
//     const matchesStorage = storage === "all" || p.storage.includes(storage);
//     return matchesText && matchesStorage;
//   });
// }
// function sortProducts(list) {
//   const mode = priceSort.value;
//   if (mode === "low-high") return [...list].sort((a,b)=>a.price-b.price);
//   if (mode === "high-low") return [...list].sort((a,b)=>b.price-a.price);
//   return list;
// }

// // ================= RENDER =================
// const grid = $("#productGrid");

// function storageButtons(p) {
//   return p.storage.map((s, idx) => `
//     <button class="storage-btn ${idx===0?'active':''}" data-id="${p.id}" data-storage="${s}">${s}</button>
//   `).join("");
// }

// function card(p) {
//   return `
//     <article class="card" data-id="${p.id}">
//       <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy" />
//       <div class="card-body">
//         <h3 class="card-title">${p.name}</h3>
//         <div class="price">${p.displayPrice}</div>
//         <div class="storage" role="group">
//           ${storageButtons(p)}
//         </div>
//         <div class="buy-row">
//           <button class="buy-btn" data-id="${p.id}">Buy</button>
//           <button class="wishlist-btn" data-id="${p.id}">❤️</button>
//         </div>
//       </div>
//     </article>
//   `;
// }

// function render() {
//   const filtered = filterProducts(PRODUCTS);
//   const sorted = sortProducts(filtered);
//   grid.innerHTML = sorted.map(card).join("");
// }

// // ================= EVENTS =================
// document.addEventListener("click", (e) => {
//   const t = e.target;

//   // Storage select
//   if (t.matches(".storage-btn")) {
//     const cardEl = t.closest(".card");
//     cardEl.querySelectorAll(".storage-btn").forEach(b => b.classList.remove("active"));
//     t.classList.add("active");
//     cardEl.dataset.storage = t.getAttribute("data-storage");
//   }

//   // Buy → Add to Cart
//   if (t.matches(".buy-btn")) {
//     const id = Number(t.getAttribute("data-id"));
//     const product = PRODUCTS.find(p=>p.id===id);
//     const cardEl = t.closest(".card");
//     const chosen = cardEl.dataset.storage || product.storage[0];

//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       displayPrice: product.displayPrice,
//       storage: chosen,
//       img: product.img
//     });
//     localStorage.setItem("cart", JSON.stringify(cart));
//     window.location.href = "cart.html";
//   }

//   // Wishlist
//   if (t.matches(".wishlist-btn")) {
//     const id = Number(t.getAttribute("data-id"));
//     const product = PRODUCTS.find(p=>p.id===id);
//     const cardEl = t.closest(".card");
//     const chosen = cardEl.dataset.storage || product.storage[0];

//     let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     wishlist.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       displayPrice: product.displayPrice,
//       storage: chosen,
//       img: product.img
//     });
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     window.location.href = "wishlist.html";
//   }

//   // Search toggle
//   if (t === searchBtn) toggleSearchBar();

//   // Theme toggle
//   if (t.id === "themeToggle") toggleTheme();
// });

// storageFilter.addEventListener("change", render);
// priceSort.addEventListener("change", render);
// searchInput?.addEventListener("input", render);

// // Footer year
// $("#year").textContent = new Date().getFullYear();

// // Init
// loadTheme();
// render();








// ================= PRODUCTS =================
const PRODUCTS = [
  { id: 1, name: "iPhone 16 Pro Max", price: 159900, displayPrice: "₹1,59,900", img: "images/iphone-16-pro-max.png", storage: ["256GB","512GB","1TB"] },
  { id: 2, name: "iPhone 16 Pro", price: 139900, displayPrice: "₹1,39,900", img: "images/iphone-16-pro.png", storage: ["256GB","512GB","1TB"] },
  { id: 3, name: "iPhone 16 Plus", price: 89900, displayPrice: "₹89,900", img: "images/iphone-16-plus.png", storage: ["128GB","256GB","512GB"] },
  { id: 4, name: "iPhone 16", price: 79900, displayPrice: "₹79,900", img: "images/iphone-16.png", storage: ["128GB","256GB","512GB"] },
  { id: 5, name: "iPhone 15", price: 69900, displayPrice: "₹69,900", img: "images/iphone-15.png", storage: ["128GB","256GB","512GB"] },
  { id: 6, name: "iPhone 15 Plus", price: 79900, displayPrice: "₹79,900", img: "images/iphone-15-plus.png", storage: ["128GB","256GB","512GB"] },
  { id: 7, name: "iPhone 14", price: 69900, displayPrice: "₹69,900", img: "images/iphone-14.png", storage: ["128GB","256GB"] },
  { id: 8, name: "iPhone 13", price: 59900, displayPrice: "₹59,900", img: "images/iphone-13.png", storage: ["128GB","256GB"] },
  { id: 9, name: "iPhone SE", price: 49900, displayPrice: "₹49,900", img: "images/iphone-se.png", storage: ["64GB","128GB","256GB"] },
];

// ================= UTILITIES =================
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ================= THEME TOGGLE =================
const root = document.documentElement;
const THEME_KEY = "store_theme";

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
}
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

// ================= SEARCH =================
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
function getSearchQuery() {
  return (searchInput?.value || "").trim().toLowerCase();
}

// ================= FILTERS & SORT =================
const storageFilter = $("#storageFilter");
const priceSort = $("#priceSort");

function filterProducts(list) {
  const q = getSearchQuery();
  const storage = storageFilter.value;
  return list.filter(p => {
    const matchesText = !q || p.name.toLowerCase().includes(q);
    const matchesStorage = storage === "all" || p.storage.includes(storage);
    return matchesText && matchesStorage;
  });
}
function sortProducts(list) {
  const mode = priceSort.value;
  if (mode === "low-high") return [...list].sort((a,b)=>a.price-b.price);
  if (mode === "high-low") return [...list].sort((a,b)=>b.price-a.price);
  return list;
}

// ================= RENDER =================
const grid = $("#productGrid");

function storageButtons(p) {
  return p.storage.map((s, idx) => `
    <button class="storage-btn ${idx===0?'active':''}" data-id="${p.id}" data-storage="${s}">${s}</button>
  `).join("");
}

function card(p) {
  return `
    <article class="card" data-id="${p.id}">
      <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <div class="price">${p.displayPrice}</div>
        <div class="storage" role="group">
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
  grid.innerHTML = sorted.map(card).join("");
}

// ================= EVENTS =================
document.addEventListener("click", (e) => {
  const t = e.target;

  // Storage select
  if (t.matches(".storage-btn")) {
    const cardEl = t.closest(".card");
    cardEl.querySelectorAll(".storage-btn").forEach(b => b.classList.remove("active"));
    t.classList.add("active");
    cardEl.dataset.storage = t.getAttribute("data-storage");
  }

  // Buy → Show alert
  if (t.matches(".buy-btn")) {
    const id = Number(t.getAttribute("data-id"));
    const product = PRODUCTS.find(p => p.id === id);
    const cardEl = t.closest(".card");
    const chosen = cardEl.dataset.storage || product.storage[0];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      displayPrice: product.displayPrice,
      storage: chosen,
      img: product.img
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} (${chosen}) added to cart!`);
  }

  // Search toggle
  if (t === searchBtn) toggleSearchBar();

  // Theme toggle
  if (t.id === "themeToggle") toggleTheme();
});

storageFilter.addEventListener("change", render);
priceSort.addEventListener("change", render);
searchInput?.addEventListener("input", render);

// Footer year
$("#year").textContent = new Date().getFullYear();

// Init
loadTheme();
render();
