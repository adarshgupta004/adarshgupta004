const productContainer = document.querySelector('.product-container');
const cartItems = document.querySelector('.cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutButton = document.getElementById('checkout-button');

let cart = {}; // Cart object to store items

// Function to add items to the cart
function addToCart(product) {
    if (cart[product.id]) {
        cart[product.id].quantity++;
    } else {
        cart[product.id] = {
            ...product,
            quantity: 1
        };
    }
    updateCart();
}

// Function to update the cart display
function updateCart() {
    cartItems.innerHTML = ''; // Clear existing cart items
    let totalPrice = 0;
    for (const productId in cart) {
        const item = cart[productId];
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    }
    cartTotalPrice.textContent = totalPrice.toFixed(2);
}

// Add event listener to product items for adding to cart
productContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        // Assuming you have a "Add to Cart" button with this class
        const productItem = event.target.closest('.product-item');
        const productId = productItem.dataset.productId; // Get product ID from data attribute
        const product = {
            id: productId,
            name: productItem.querySelector('h3').textContent,
            price: parseFloat(productItem.querySelector('.price').textContent.replace('$', '')) 
        };
        addToCart(product);
    }
});

// Example product data (you'll need to fetch this from your backend)
const products = [
    { id: '1', name: 'Product 1', price: 19.99 },
    { id: '2', name: 'Product 2', price: 29.99 },
    // ... more products
];

// Create product items dynamically (you'll likely fetch this from your backend)
products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.dataset.productId = product.id;
    productItem.innerHTML = `
        <img src="images/${product.id}.jpg" alt="${product.name}"> 
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
    `;
    productContainer.appendChild(productItem);
});

// Checkout button event listener
checkoutButton.addEventListener('click', () => {
    // Handle checkout logic here (e.g., send cart data to your backend)
    console.log("Checkout button clicked");
    console.log(cart); // Log the cart to the console
});