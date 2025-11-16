document.getElementById("checkout-form").addEventListener("submit", function(e){
    e.preventDefault();

    let phone = document.getElementById("phone").value;
    let location = document.getElementById("location").value;
    let payment = document.getElementById("payment").value;

    if (!phone || !location || !payment) {
        alert("Please fill all fields");
        return;
    }

    let details = {
        phone,
        location,
        payment,
        date: new Date().toLocaleString()
    };

    localStorage.setItem("orderDetails", JSON.stringify(details));

    alert("Order Confirmed! We will contact you.");

    // optionally clear cart
    localStorage.removeItem("cart");

    window.location.href = "index.html";
});
