
/**
 * AYMANE STORE - Premium Interaction Logic
 * Handles animations, order processing, and interactive elements.
 */

document.addEventListener('DOMContentLoaded', () => {
    initCosmicBackground();
    initCountdownTimer();
    initMysteryBox();
});

// --- Cosmic Background Animation ---
function initCosmicBackground() {
    const canvas = document.getElementById('cosmic-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.5 ? '#c5a059' : '#ffffff';
            this.alpha = Math.random();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- Countdown Timer ---
function initCountdownTimer() {
    let timeInSeconds = 15 * 60;
    const timerElement = document.getElementById('timer-display');
    if (!timerElement) return;

    setInterval(() => {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        timerElement.innerText = `${minutes}:${seconds}`;
        
        if (timeInSeconds > 0) {
            timeInSeconds--;
        } else {
            timeInSeconds = 15 * 60; 
        }
    }, 1000);
}

// --- Order Processing ---
let currentP = "", currentPr = "", basePriceNum = 0;

function openOrder(name, price) {
    currentP = name; 
    currentPr = price;
    basePriceNum = parseInt(price.replace(/[^\d]/g, '')) || 199;

    const nameDisplay = document.getElementById('pNameDisplay');
    const priceDisplay = document.getElementById('pPriceDisplay');
    if (nameDisplay) nameDisplay.innerText = "Ordering: " + name;
    if (priceDisplay) priceDisplay.innerText = "Price: " + price;
    
    document.getElementById('cust_city').value = "Kenitra";
    document.getElementById('cust_qty').value = 1;
    document.getElementById('cust_name').value = "";
    document.getElementById('cust_phone').value = "";
    
    calculateTotal();
    const modal = document.getElementById('orderModal');
    if (modal) modal.style.display = "flex";
}

function closeOrder() { 
    const modal = document.getElementById('orderModal');
    if (modal) modal.style.display = "none"; 
}

window.onclick = function(event) {
    let modal = document.getElementById('orderModal');
    if (event.target == modal) { closeOrder(); }
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
                        "*✓ Luxury Collection Selection*\n\n" +
                        "*Product:* " + currentP + "\n" +
                        "*Price:* " + currentPr + "\n" +
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

// --- Interactive Elements ---

function switchCypherImage(element) {
    // Find the container for this specific ensemble showcase
    const container = element.closest('.cypher-showcase-wrapper');
    const mainImg = container.querySelector('.standing-product-img-summer');
    
    if (mainImg) {
        mainImg.src = element.src;
    }
    
    // Update active state for thumbnails in this container
    const thumbnails = container.querySelectorAll('.thumb-capsule-summer');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}

function revealMystery() {
    const closedView = document.getElementById('boxClosed');
    const openView = document.getElementById('boxOpen');
    const container = document.getElementById('mysteryContainer');

    if (!closedView || !openView || !container) return;

    closedView.style.display = 'none';
    openView.style.display = 'block';
    
    container.style.borderColor = 'var(--primary-gold)';
    container.style.boxShadow = '0 0 50px rgba(197, 160, 89, 0.3)';

    initPartyConfetti();
}

function initPartyConfetti() {
    const pCanvas = document.getElementById('party-canvas');
    if (!pCanvas) return;
    
    const pCtx = pCanvas.getContext('2d');
    pCanvas.width = pCanvas.parentElement.clientWidth;
    pCanvas.height = pCanvas.parentElement.clientHeight;

    let confettiPieces = [];
    const colors = ['#c5a059', '#D4AF37', '#000000', '#ffffff'];

    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: pCanvas.width / 2,
            y: pCanvas.height / 2,
            size: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 12,
            speedY: (Math.random() - 0.7) * 15,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    function animate() {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        let active = false;
        confettiPieces.forEach(p => {
            if (p.opacity > 0) {
                p.x += p.speedX;
                p.y += p.speedY;
                p.speedY += 0.4;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.015;
                pCtx.save();
                pCtx.globalAlpha = p.opacity;
                pCtx.translate(p.x, p.y);
                pCtx.rotate(p.rotation * Math.PI / 180);
                pCtx.fillStyle = p.color;
                pCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                pCtx.restore();
                active = true;
            }
        });
        if (active) requestAnimationFrame(animate);
    }
    animate();
}

// Export functions to global scope for HTML onclick handlers
window.openOrder = openOrder;
window.closeOrder = closeOrder;
window.calculateTotal = calculateTotal;
window.sendOrder = sendOrder;
window.switchCypherImage = switchCypherImage;
window.revealMystery = revealMystery;
