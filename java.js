// sample product data (later tutaleta kutoka DB)
const products = [
  { name: "Daily Meal 70kg", category: "Animal feed", price: 3500, img: "images/feed1.jpg" },
  { name: "Dairy Meal 50kg", category: "feeds", price: 2800, img: "images/feed2.jpg" },
  { name: "Poultry Mash", category: "feeds", price: 1800, img: "images/chickenfeed.jpg" },
  { name: "Vet Dewormer", category: "medicine", price: 700, img: "images/dewormer.jpg" },
  { name: "Insecticide Bottle", category: "pesticides", price: 500, img: "images/pesticide.jpg" },
  { name: "Farm Cutter Tool", category: "tools", price: 1200, img: "images/tools.jpg" }
];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// ✅ populate category dropdown dynamically
let categories = [...new Set(products.map(product => product.category))];
categories.forEach(category => {
  let option = document.createElement("option");
  option.value = category;
  option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  categoryFilter.appendChild(option);
});

function renderProducts() {
  productContainer.innerHTML = "";

  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  products
    .filter(product =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchValue)
    )
    .forEach(product => {
      let card = `
        <div class="product-card">
          <img src="${product.img}">
          <h3>${product.name}</h3>
          <p class="price">KES ${product.price}</p>
        </div>
      `;
      productContainer.innerHTML += card;
    });
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);

renderProducts(); // initial load
