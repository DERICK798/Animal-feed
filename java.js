// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = cart.length;
  }
}
updateCartCount();

// Add event listeners to all Add to Cart buttons
const buttons = document.querySelectorAll('.btn-shop');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Add product to cart
    cart.push({ name, price });

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Notify user
    alert(`${name} imeongezwa kwenye cart!`);
  });
});

// Optional: Add category filter
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const products = document.querySelectorAll('.product-card');

function filterProducts() {
  const category = categoryFilter.value;
  const search = searchInput.value.toLowerCase();

  products.forEach(product => {
    const prodCategory = product.getAttribute('data-category').toLowerCase();
    const prodName = product.querySelector('h3').textContent.toLowerCase();

    if ((category === 'all' || prodCategory.includes(category)) && prodName.includes(search)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

categoryFilter.addEventListener('change', filterProducts);
searchInput.addEventListener('keyup', filterProducts);
