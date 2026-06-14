
// Luxury Fashion Brand Interaction Script

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

let currentProductName = "";
let currentProductPrice = "";
let basePriceNum = 0;

function openOrder(name, price) {
    currentProductName = name;
    currentProductPrice = price;
    basePriceNum = parseInt(price.replace(/[^\d]/g, '')) || 0;

    document.getElementById('pNameDisplay').innerText = name;
    document.getElementById('pPriceDisplay').innerText = price;
    
    document.getElementById('summary-product-price').innerText = price;
    
    // Reset form
    document.getElementById('cust_name').value = "";
    document.getElementById('cust_phone').value = "";
    document.getElementById('cust_city').value = "";
    document.getElementById('cust_qty').value = 1;
    
    calculateTotal();
    document.getElementById('orderModal').style.display = "flex";
}

function closeOrder() {
    document.getElementById('orderModal').style.display = "none";
}

window.onclick = function(event) {
    let modal = document.getElementById('orderModal');
    if (event.target == modal) {
        closeOrder();
    }
}

function calculateTotal() {
    const city = document.getElementById('cust_city').value;
    const qty = parseInt(document.getElementById('cust_qty').value) || 1;
    
    let shipping = 0;
    if (city === 'Kenitra') shipping = 0;
    else if (city === 'Rabat') shipping = 20;
    else if (city === 'Casablanca') shipping = 30;
    else if (city === 'Other') shipping = 45;

    let productTotal = basePriceNum * qty;
    let finalTotal = productTotal + shipping;

    document.getElementById('summary-product-price').innerText = productTotal + " DH";
    document.getElementById('summary-shipping-price').innerText = shipping + " DH";
    document.getElementById('summary-total-price').innerText = finalTotal + " DH";
}

function sendOrder() {
    const name = document.getElementById('cust_name').value;
    const phone = document.getElementById('cust_phone').value;
    const city = document.getElementById('cust_city').value;
    const size = document.getElementById('cust_size').value;
    const qty = parseInt(document.getElementById('cust_qty').value) || 1;

    if(name && phone && city && qty) {
        let shipping = 0;
        if (city === 'Kenitra') shipping = 0;
        else if (city === 'Rabat') shipping = 20;
        else if (city === 'Casablanca') shipping = 30;
        else if (city === 'Other') shipping = 45;

        let productTotal = basePriceNum * qty;
        let finalTotal = productTotal + shipping;

        const message = "*NEW ORDER - AYMANE STORE*\n" +
                        "*✓ Premium Luxury Collection*\n\n" +
                        "*Product:* " + currentProductName + "\n" +
                        "*Price:* " + currentProductPrice + "\n" +
                        "*Size:* " + size + "\n" +
                        "*Quantity:* " + qty + "\n" +
                        "*Shipping:* " + shipping + " DH\n" +
                        "*Total:* " + finalTotal + " DH\n\n" +
                        "*Customer:* " + name + "\n" +
                        "*Phone:* " + phone + "\n" +
                        "*City:* " + city;
        const waUrl = "https://wa.me/212689248338?text=" + encodeURIComponent(message);
        
        closeOrder();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = waUrl;
        } else {
            window.open(waUrl, "_blank");
        }
    } else { 
        alert("المرجو ملء جميع البيانات لتأكيد طلبك بنجاح!"); 
    }
}
