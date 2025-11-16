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
    alert(`${name} order placed!`);
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

    // Checkout action
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Cart yako iko empty!");
            return;
        }
    // Disable button to prevent double-clicks while processing
    checkoutBtn.disabled = true;
    const prevText = checkoutBtn.textContent;
    checkoutBtn.textContent = 'Processing...';

    // Simulate processing delay, then clear cart and refresh page so cart shows the new empty state
    setTimeout(() => {
      // In a real app you'd call your backend here. For now we clear local cart immediately.
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();

      // Notify user and reload so the cart page updates to the new empty state
      alert('Checkout successful! Your cart has been cleared.');
      // Restore button (in case reload is blocked) and then reload page
      checkoutBtn.disabled = false;
      checkoutBtn.textContent = prevText;
      window.location.reload();
    }, 600);
    });

    function goToCheckout() {
    window.location.href = "checkout.html";
}

}
