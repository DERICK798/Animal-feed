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

// Add event listeners only to Add-to-Cart buttons that include product data
// This prevents binding to decorative buttons that don't supply product attributes
const buttons = document.querySelectorAll('.btn-shop[data-name][data-price]');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const priceAttr = button.getAttribute('data-price');

    // Defensive checks: ensure attributes exist and price is a valid number
    if (!name || priceAttr === null) {
      console.warn('Add-to-cart button missing data-name or data-price:', button);
      return; // ignore this button
    }

    const price = parseFloat(priceAttr);
    if (Number.isNaN(price)) {
      console.warn('Invalid data-price on Add-to-cart button:', priceAttr, button);
      return;
    }

    // Add product to cart
    cart.push({ name, price });

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
