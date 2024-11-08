document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Nox", price: 37.99 },
    { id: 2, name: "Rose", price: 90.0 },
    { id: 3, name: "Xnet", price: 25.99 },
    { id: 4, name: "Kyrox", price: 19.9999 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => renderTask(item));

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotalMsg = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productdiv = document.createElement("div");
    productdiv.classList.add("product");
    productdiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
    productList.appendChild(productdiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveTasks();
    renderCart();
  }

  function saveTasks() {
    localStorage.setItem("items", JSON.stringify(cart));
  }

  function renderCart(item) {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden");
      cartTotalMsg.classList.remove("hidden");

      cart.forEach((item, idx) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}
        <button class="cart-button" data-index="${idx}" >remove</button>
        `;
        cartItem.classList.add("cart-flex");
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      cartItems.querySelectorAll(".cart-button").forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = parseInt(e.target.getAttribute("data-index"));
          removeFromCart(index);
        });
      });
    } else {
      emptyCartMsg.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  function removeFromCart(index) {
    // Remove item from cart array by index
    cart.splice(index, 1);
    saveTasks();
    renderCart();
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("checkout successfully");
    renderCart();
  });
});
