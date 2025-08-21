



let selectedColor = 'black';
let selectedSize = 'standard';
let currentQuantity = 1;



function changeImage(emoji, element) {
    document.getElementById('mainImage').textContent = emoji;

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

function selectColor(element) {
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    element.classList.add('active');
    selectedColor = element.dataset.color;
}

function selectSize(element, size) {
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('active');
    });
    element.classList.add('active');
    selectedSize = size;
}

function changeQuantity(change) {
    const qtyInput = document.getElementById('quantity');
    let newQty = parseInt(qtyInput.value) + change;

    if (newQty >= 1 && newQty <= 10) {
        qtyInput.value = newQty;
        currentQuantity = newQty;
    }
}

function addToCart(event) {
    const btn = event.target;
    const originalHTML = btn.innerHTML;

    // Show loading state
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Adding...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added!';
        btn.classList.remove('btn-primary-custom');
        btn.classList.add('btn-success');
    }, 500);

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('btn-success');
        btn.classList.add('btn-primary-custom');
        btn.disabled = false;
    }, 2000);

    console.log('Added to cart:', {
        name: 'Wireless Headphones Pro',
        color: selectedColor,
        size: selectedSize,
        quantity: currentQuantity,
        price: 149.99
    });
}

function addToWishlist(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('bi-heart')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        btn.classList.remove('btn-outline-primary-custom');
        btn.classList.add('btn-danger');
    } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-outline-primary-custom');
    }
}

// Quantity input validation
document.getElementById('quantity').addEventListener('change', function () {
    if (this.value < 1) this.value = 1;
    if (this.value > 10) this.value = 10;
    currentQuantity = parseInt(this.value);
});


async function addToCart(productId, btn) {
    try {
        let res = await fetch(`http://localhost:5000/cart/add/${productId}`, {
            method: "POST"
        });
        console.log(res)
        if (res.ok) {
            // Change button text or style without reload
            btn.innerHTML = '<i class="fa-solid fa-check me-2"></i> Added!';
            btn.disabled = true;
            btn.classList.add('btn-success');
        } else {
            alert("Failed to add to cart");
        }

    } catch (err) {
        console.log(err)
    }

}





// / Dahsboradt Scripts--------------------------<<
