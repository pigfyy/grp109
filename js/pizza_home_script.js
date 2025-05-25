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

// Modal handling
const modal = document.getElementById("order-modal");
const overlay = document.getElementById("overlay");
const pickupButton = document.getElementById("pickup-button");
const deliveryButton = document.getElementById("delivery-button");
const submitButton = document.querySelector("#submit-order button");

function showModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

// Trigger modal from form
function triggerModalBeforeOrder() {
  const customerName = document.getElementById("customer-name").value;

  if (!customerName) {
    alert("Please enter your name.");
    return;
  }

  // Reset and hide the address field when modal shows
  document.getElementById("address-field").style.display = "none";
  document.getElementById("customer-address").value = "";

  showModal();
}

// Actual order processing
function handleSubmitOrder(method) {
  const orderConfirmation = document.getElementById("order-confirmation");
  const orderItems = document.getElementById("order-items");
  const menuArea = document.querySelector(".menu-area");
  const customerName = document.getElementById("customer-name").value;
  const customerAddress = document.getElementById("customer-address").value;
  let total = 0;

  orderItems.innerHTML = "";

  const deliveryInfo = document.createElement("p");
  deliveryInfo.textContent = `${method} for: ${customerName} at ${customerAddress}`;
  orderItems.appendChild(deliveryInfo);

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

  menuArea.style.display = "none";
  orderConfirmation.style.display = "block";

  submitButton.textContent = "Restart Order";
  submitButton.removeEventListener("click", triggerModalBeforeOrder);
  submitButton.addEventListener("click", function restartOrder() {
    orderConfirmation.style.display = "none";
    menuArea.style.display = "block";
    submitButton.textContent = "Submit Order";

    currentOrder = [];

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.value = 0;
    });

    submitButton.removeEventListener("click", arguments.callee);
    submitButton.addEventListener("click", triggerModalBeforeOrder);
  });

  currentOrder = [];
}

// Modal choice actions
pickupButton.addEventListener("click", () => {
  hideModal();
  handleSubmitOrder("Pickup");
});

pickupButton.addEventListener("click", () => {
  hideModal();
  handleSubmitOrder("Pickup");
});

deliveryButton.addEventListener("click", () => {
  // Show the address field before submission
  const addressField = document.getElementById("customer-address");
  if (!addressField.value.trim()) {
    alert("Please enter your delivery address.");
    return;
  }

  hideModal();
  handleSubmitOrder("Delivery");
});

// Initial click setup
submitButton.addEventListener("click", triggerModalBeforeOrder);
