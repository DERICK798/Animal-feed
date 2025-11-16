// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById("checkout-form").addEventListener("submit", function(e){
    e.preventDefault();

    let phone = document.getElementById("phone").value.trim();
    let location = document.getElementById("location").value.trim();
    let payment = document.getElementById("payment").value.trim();

    // Validate all fields are filled
    if (!phone || !location || !payment) {
        alert("Please fill all fields!");
        return;
    }

    // Validate cart is not empty
    if (cart.length === 0) {
        alert("Your cart is empty! Add items before checkout.");
        return;
    }

    // Calculate total
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    // Create order details with cart info
    let details = {
        phone,
        location,
        payment,
        items: cart,
        total: total,
        date: new Date().toLocaleString()
    };

    localStorage.setItem("orderDetails", JSON.stringify(details));

    alert("Order Confirmed! We will contact you.");

    // Clear cart after successful order
    localStorage.removeItem("cart");

    window.location.href = "index.html";
});
