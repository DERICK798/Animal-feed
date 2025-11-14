// If on cart page, display cart items
if (document.getElementById('cart-items')) {

    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let total = 0;

    // Clear old content
    cartItemsContainer.innerHTML = "";

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

    // Set total price
    totalPriceEl.textContent = total;

    // Checkout action
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Cart yako iko empty!");
            return;
        }

        alert("Checkout successful!");

        // Optional: Clear cart after checkout
        // cart = [];
        // localStorage.setItem('cart', JSON.stringify(cart));
        // updateCartCount();
        // window.location.reload();
    });
}
