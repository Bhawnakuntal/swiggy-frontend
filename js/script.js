document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Login submitted!");
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Signup submitted!");
    });
  }
});


// Cart array
let cart = [];

// Load cart from localStorage when page loads
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

// Add to cart function
function addToCart(itemName, price) {
  cart.push({ name: itemName, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(itemName + " added to cart!");
}

// Display cart items on cart page
function displayCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceSpan = document.getElementById('total-price');

  if (!cartItemsDiv || !totalPriceSpan) return;

  cartItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceSpan.textContent = '0';
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <h4>${item.name}</h4>
      <span>$${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  totalPriceSpan.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Checkout placeholder
function checkout() {
  alert("Checkout functionality will be implemented soon!");
  console.log("Proceeding to checkout", cart);
}

// Run displayCart when on cart page
document.addEventListener('DOMContentLoaded', () => {
  displayCart();
});

function checkout() {
  alert("Thank you for your order!");
  // Clear cart and redirect to order confirmation
  localStorage.removeItem('cart');
  window.location.href = "order.html";
}

const categories = document.querySelector('.food-categories .categories');
const prevBtn = document.querySelector('.food-categories .prev');
const nextBtn = document.querySelector('.food-categories .next');

let scrollAmount = 0;
const cardWidth = 200; // width + gap

nextBtn.addEventListener('click', () => {
  scrollAmount += cardWidth;
  if (scrollAmount > categories.scrollWidth - categories.clientWidth) {
    scrollAmount = 0; // loop back
  }
  categories.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener('click', () => {
  scrollAmount -= cardWidth;
  if (scrollAmount < 0) {
    scrollAmount = categories.scrollWidth - categories.clientWidth;
  }
  categories.style.transform = `translateX(-${scrollAmount}px)`;
});
