document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const phone = document.getElementById("phone").value.trim();
        const location = document.getElementById("location").value.trim();
        const payment = document.getElementById("payment").value.trim();

        if (!phone || !location || !payment) {
            alert("Please fill all fields!");
            return;
        }

        // Read cart
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch {
            cart = [];
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Calculate total
        const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

        // Save order locally
        const details = {
            phone,
            location,
            payment,
            items: cart,
            total,
            date: new Date().toLocaleString()
        };

        localStorage.setItem("orderDetails", JSON.stringify(details));

        // Send to backend
        const data = new FormData();
        data.append("phone", phone);
        data.append("location", location);
        data.append("payment", payment);
        data.append("total", total);
        data.append("items", JSON.stringify(cart));

        const response = await fetch("api/manage-order.php", {
            method: "POST",
            body: data
        });

        const result = await response.text();
        alert(result);

        // Clear cart after order
        localStorage.removeItem("cart");

        // Redirect safely
        window.location.href = "index.html";
    });
});
/**
 * @memberof window
 * @function
 */
img.onerror = () => {
    img.src = "images/placeholder.jpg";
};
