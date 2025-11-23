// Safe checkout handling: wait for DOM, parse cart safely and re-read cart at submit
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (!form) {
        console.warn('checkout.js: #checkout-form not found on this page');
        return;
    }

    function readCart() {
        try {
            const raw = localStorage.getItem('cart');
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            console.error('checkout.js: failed to parse cart from localStorage', err);
            return [];
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const phone = (document.getElementById('phone')?.value || '').trim();
        const location = (document.getElementById('location')?.value || '').trim();
        const payment = (document.getElementById('payment')?.value || '').trim();

        // Validate all fields are filled
        if (!phone || !location || !payment) {
            alert('Please fill all fields!');
            return;
        }

        // Re-read cart at submit time so we have latest items
        const cart = readCart();

        // Validate cart is not empty
        if (!cart || cart.length === 0) {
            alert('Your cart is empty! Add items before checkout.');
            return;
        }

        // Calculate total (coerce price to number)
        const total = cart.reduce((sum, item) => {
            const p = Number(item.price) || 0;
            return sum + p;
        }, 0);

        // Create order details with cart info
        const details = {
            phone,
            location,
            payment,
            items: cart,
            total,
            date: new Date().toLocaleString()
        };

        try {
            localStorage.setItem('orderDetails', JSON.stringify(details));
        } catch (err) {
            console.error('checkout.js: failed to save orderDetails', err);
        }

        alert('Order Confirmed! We will contact you.');

        // Clear cart after successful order
        localStorage.removeItem('cart');

        // Redirect to homepage
        window.location.href = 'index.html';
    });
});
