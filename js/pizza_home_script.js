let currentOrder = [];

const pizzaMenu = [
  {
    id: "cheese",
    price: 9.99,
  },
  {
    id: "margherita",
    price: 10.99,
  },
  {
    id: "pepperoni",
    price: 12.49,
  },
  {
    id: "bbq chicken",
    price: 13.99,
  },
  {
    id: "veggie supreme",
    price: 11.99,
  },
  {
    id: "hawaiian",
    price: 12.29,
  },
];

// each quantity selector gets the same event handler which checks for clicks on its corresponding minus and plus buttons to increment and decrement the amount of each pizza ordered by the user
document.querySelectorAll(".quantity-selector").forEach((selector) => {
  const minusBtn = selector.querySelector(".minus-btn");
  const plusBtn = selector.querySelector(".plus-btn");
  const input = selector.querySelector(".quantity-input");

  // handles increasing
  plusBtn.addEventListener("click", () => {
    let value = parseInt(input.value) || 0;
    input.value = value + 1;
    updateOrder(selector);
  });

  // handles decreasing
  minusBtn.addEventListener("click", () => {
    let value = parseInt(input.value) || 0;
    if (value > 0) {
      input.value = value - 1;
      updateOrder(selector);
    }
  });

  // handles when the user manually changes the quantity input by typing it in
 input.addEventListener("change", () => {
    let value = parseInt(input.value) || 0;
    if (value < 0) value = 0;
    input.value = value;
    updateOrder(selector);
  });
});

// Update currentOrder array
function updateOrder(selector) {
  const pizzaItem = selector.closest(".pizza-item");
  const pizzaName = pizzaItem.querySelector("h1").textContent.toLowerCase();
  const quantity =
    parseInt(selector.querySelector(".quantity-input").value) || 0;

  currentOrder = currentOrder.filter((item) => item.id !== pizzaName);

  if (quantity > 0) {
    currentOrder.push({ id: pizzaName, quantity });
  }
}

// Get DOM elements
const modal = document.getElementById("order-modal");
const overlay = document.getElementById("overlay");
const pickupButton = document.getElementById("pickup-button");
const deliveryButton = document.getElementById("delivery-button");
const submitButton = document.querySelector("#submit-order button");
const addressFieldContainer = document.getElementById("address-field");
const customerNameInput = document.getElementById("customer-name");
const customerAddressInput = document.getElementById("customer-address");
const orderConfirmation = document.getElementById("order-confirmation");
const orderItems = document.getElementById("order-items");
const menuArea = document.querySelector(".menu-area");

let currentOrder = []; // Assuming your order logic is the same as before

// Show modal and reset inputs
function openOrderModal() {
  modal.style.display = "block";
  overlay.style.display = "block";

  // Reset inputs for a fresh start
  customerNameInput.value = "";
  customerAddressInput.value = "";
  addressFieldContainer.style.display = "none"; // Hide address by default
}

// Hide modal
function closeOrderModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

// Close modal on clicking overlay outside modal
window.onclick = function(event) {
  if (event.target === modal || event.target === overlay) {
    closeOrderModal();
  }
};

// Handle pickup button - hide address, submit order
pickupButton.addEventListener("click", () => {
  addressFieldContainer.style.display = "none"; // Hide address field for pickup
  if (!customerNameInput.value.trim()) {
    alert("Please enter your name.");
    return;
  }

  closeOrderModal();
  finalizeOrder("Pickup");
});

// Handle delivery button - show address field, validate input
deliveryButton.addEventListener("click", () => {
  if (!customerNameInput.value.trim()) {
    alert("Please enter your name.");
    return;
  }

  // Show address input field for delivery
  addressFieldContainer.style.display = "block";

  // Check if address is filled
  if (!customerAddressInput.value.trim()) {
    alert("Please enter your delivery address.");
    customerAddressInput.focus();
    return;
  }

  closeOrderModal();
  finalizeOrder("Delivery");
});

// Show order confirmation and hide menu
function finalizeOrder(deliveryType) {
  orderItems.innerHTML = "";

  const deliveryInfo = document.createElement("p");
  const addressText = deliveryType === "Delivery" ? ` at ${customerAddressInput.value}` : "";
  deliveryInfo.textContent = `Order Type: ${deliveryType}. Delivery to: ${customerNameInput.value}${addressText}`;
  orderItems.appendChild(deliveryInfo);

  let total = 0;

  currentOrder.forEach((orderItem) => {
    const pizza = pizzaMenu.find((p) => p.id === orderItem.id);
    if (pizza) {
      const li = document.createElement("li");
      const itemTotal = pizza.price * orderItem.quantity;
      li.textContent = `${orderItem.quantity}x ${
        orderItem.id.charAt(0).toUpperCase() + orderItem.id.slice(1)
      } Pizza - $${itemTotal.toFixed(2)}`;
      orderItems.appendChild(li);
      total += itemTotal;
    }
  });

  const totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: $${total.toFixed(2)}`;
  orderItems.appendChild(totalLi);

  if (menuArea) menuArea.style.display = "none";
  orderConfirmation.style.display = "block";

  // Reset order and inputs for next order
  currentOrder = [];
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.value = 0;
  });
}

// Attach event to "Order Now" button to open modal
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Basic name validation before opening modal
  if (!customerNameInput.value.trim()) {
    alert("Please enter your name before ordering.");
    return;
  }

  openOrderModal();
});
