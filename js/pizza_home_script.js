// pizza_home_script.js

let currentOrder = [];

const pizzaMenu = [
  { id: "cheese", price: 9.99 },
  { id: "margherita", price: 10.99 },
  { id: "pepperoni", price: 12.49 },
  { id: "bbq chicken", price: 13.99 },
  { id: "veggie supreme", price: 11.99 },
  { id: "hawaiian", price: 12.29 },
];

document.addEventListener("DOMContentLoaded", function () {
  const orderNowBtn = document.querySelector(".order-now-button");
  const orderModal = document.getElementById("order-modal");
  const overlay = document.getElementById("overlay");
  const pickupBtn = document.getElementById("pickup-button");
  const deliveryBtn = document.getElementById("delivery-button");
  const addressField = document.getElementById("customer-address");

  // Show the modal when Order Now is clicked
  orderNowBtn.addEventListener("click", function (e) {
    e.preventDefault(); // prevent accidental form submission
    orderModal.style.display = "block";
    overlay.style.display = "block";
  });

  // Handle pickup selection
  pickupBtn.addEventListener("click", function () {
    document.getElementById("address-field").style.display = "none";
    addressField.disabled = true;
    closeOrderModal();
  });

  // Handle delivery selection
  deliveryBtn.addEventListener("click", function () {
    document.getElementById("address-field").style.display = "block";
    addressField.disabled = false;
    closeOrderModal();
  });

  // Close the order modal
  function closeOrderModal() {
    orderModal.style.display = "none";
    overlay.style.display = "none";
  }

  // Pizza quantity selector logic
  document.querySelectorAll(".quantity-selector").forEach((selector) => {
    const minusBtn = selector.querySelector(".minus-btn");
    const plusBtn = selector.querySelector(".plus-btn");
    const input = selector.querySelector(".quantity-input");

    plusBtn.addEventListener("click", () => {
      let value = parseInt(input.value) || 0;
      input.value = value + 1;
      updateOrder(selector);
    });

    minusBtn.addEventListener("click", () => {
      let value = parseInt(input.value) || 0;
      if (value > 0) {
        input.value = value - 1;
        updateOrder(selector);
      }
    });

    input.addEventListener("change", () => {
      let value = parseInt(input.value) || 0;
      if (value < 0) value = 0;
      input.value = value;
      updateOrder(selector);
    });
  });

  function updateOrder(selector) {
    const pizzaItem = selector.closest(".pizza-item");
    const pizzaName = pizzaItem.querySelector("h1").textContent.toLowerCase();
    const quantity = parseInt(selector.querySelector(".quantity-input").value) || 0;

    currentOrder = currentOrder.filter((item) => item.id !== pizzaName);

    if (quantity > 0) {
      currentOrder.push({ id: pizzaName, quantity });
    }
  }

  // Submit Order button logic
  document
    .querySelector("#submit-order .order-button")
    .addEventListener("click", function () {
      const orderConfirmation = document.getElementById("order-confirmation");
      const orderItems = document.getElementById("order-items");

      orderItems.innerHTML = "";

      // Create a list of the pizzas ordered by the user
      currentOrder.forEach((item) => {
        const pizza = pizzaMenu.find((p) => p.id === item.id);
        if (pizza) {
          const li = document.createElement("li");
          li.textContent = `${item.quantity}x ${
            item.id.charAt(0).toUpperCase() + item.id.slice(1)
          } Pizza - $${(pizza.price * item.quantity).toFixed(2)}`;
          orderItems.appendChild(li);
        }
      });

      // Make the order confirmation visible
      orderConfirmation.style.display = "block";

      // Clear current order
      currentOrder = [];
    });
});
