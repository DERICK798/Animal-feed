// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

// Update cart count on page load
updateCartCount();

// Add event listeners only to Add-to-Cart buttons that include product name
// We will compute price (and discount) from the product card's .price element
const buttons = document.querySelectorAll('.btn-shop[data-name]');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');

    if (!name) {
      console.warn('Add-to-cart button missing data-name:', button);
      return;
    }

    // Prefer price specified in the product card's .price element (so discounts apply there)
    const productCard = button.closest('.product-card');
    let basePrice = null;
    let discount = null;

    if (productCard) {
      const priceEl = productCard.querySelector('.price');
      if (priceEl) {
        basePrice = parseFloat(priceEl.dataset.price);
        discount = priceEl.dataset.discount;
      }
    }

    // Fallback to button data-price if price wasn't found in the card
    if (basePrice === null || Number.isNaN(basePrice)) {
      const priceAttr = button.getAttribute('data-price');
      basePrice = parseFloat(priceAttr);
    }

    if (Number.isNaN(basePrice) || basePrice === null) {
      console.warn('Invalid price for product', name, basePrice);
      return;
    }

    // Compute final price after discount (if discount is present and valid)
    let finalPrice = basePrice;
    if (discount !== undefined && discount !== null && String(discount).trim() !== '') {
      const d = parseFloat(discount);
      if (!Number.isNaN(d) && d > 0) {
        finalPrice = Math.round(basePrice * (1 - d / 100));
      }
    }

    // Add product to cart using the final price
    cart.push({ name, price: finalPrice });

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Notify user
    alert(`${name} added to cart!`);
  });
});
// Star rating functionality
document.querySelectorAll('.rating').forEach(ratingBox => {
  const stars = ratingBox.querySelectorAll('span');

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      // remove active from all
      stars.forEach(s => s.classList.remove('active'));

      // add active to clicked and all before it
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('active');
      }
    });
  });
});


// Optional: Add category filter
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const products = document.querySelectorAll('.product-card');

// Render discounted prices where a data-discount is provided and update button data-price
function renderDiscounts() {
  products.forEach(product => {
    const priceEl = product.querySelector('.price');
    const addBtn = product.querySelector('.btn-shop[data-name]');
    if (!priceEl) return;

    const base = parseFloat(priceEl.dataset.price);
    const discountAttr = priceEl.dataset.discount;
    if (Number.isNaN(base)) return;

    if (discountAttr !== undefined && String(discountAttr).trim() !== '') {
      const d = parseFloat(discountAttr);
      if (!Number.isNaN(d) && d > 0) {
        const discounted = Math.round(base * (1 - d / 100));
        // show original (struck) + discounted price
        priceEl.innerHTML = `<span class="orig">Ksh ${base.toLocaleString()}</span> <span class="disc">Ksh ${discounted.toLocaleString()}</span>`;
        if (addBtn) addBtn.setAttribute('data-price', discounted);
        return;
      }
    }

    // No discount: ensure button price matches base
    priceEl.textContent = `@${base.toLocaleString()} ksh`;
    if (addBtn) addBtn.setAttribute('data-price', base);
  });
}

// Run once on page load
renderDiscounts();

if (categoryFilter && searchInput) {
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
}

// If on cart page, display cart items
if (document.getElementById('cart-items')) {

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let total = 0;

    // Clear old content
    cartItemsContainer.innerHTML = "";

    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    } else {
        // Loop through cart and display items
        cart.forEach(item => {
            total += item.price;

            const div = document.createElement('div');
            div.classList.add('cart-item');

            div.innerHTML = `
                <span>${item.name}</span>
                <span>Ksh ${item.price}</span>
            `;

            cartItemsContainer.appendChild(div);
        });
    }

    // Set total price
    totalPriceEl.textContent = total;

    // Checkout action - redirect to checkout form
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Cart yako iko empty!");
            return;
        }
        // Redirect user to checkout page to enter delivery details
        window.location.href = "checkout.html";
    });

    function goToCheckout() {
    window.location.href = "checkout.html";
}

}
