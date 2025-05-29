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

// update order utility function, handles adding and removing pizzas from the currentOrder array
function updateOrder(selector) {
  const pizzaItem = selector.closest(".pizza-item");
  const pizzaName = pizzaItem.querySelector("h1").textContent.toLowerCase();
  const quantity =
    parseInt(selector.querySelector(".quantity-input").value) || 0;

  currentOrder = currentOrder.filter((item) => item.id !== pizzaName);

  if (quantity > 0) {
    currentOrder.push({
      id: pizzaName,
      quantity: quantity,
    });
  }
}

// handles both submitting order and allowing user to restart order
function handleSubmitOrder() {
  const orderConfirmation = document.getElementById("order-confirmation");
  const orderItems = document.getElementById("order-items");
  const menuArea = document.querySelector(".menu-area");
  const submitButton = document.querySelector("#submit-order button");
  const customerName = document.getElementById("customer-name").value;
  const customerAddress = document.getElementById("customer-address").value;
  let total = 0;

  if (!customerName || !customerAddress) {
    alert("Please enter your name and delivery address");
    return;
  }

  orderItems.innerHTML = "";

  const deliveryInfo = document.createElement("p");
  deliveryInfo.textContent = `Delivery to: ${customerName} at ${customerAddress}`;
  orderItems.appendChild(deliveryInfo);

  // create a list of the pizzas ordered by the user
  currentOrder.forEach((orderItem) => {
    const pizza = pizzaMenu.find((p) => p.id === orderItem.id);
    if (pizza) {
      const li = document.createElement("li");
      // calculates and shows the amount of every pizza ordered too
      const itemTotal = pizza.price * orderItem.quantity;
      li.textContent = `${orderItem.quantity}x ${
        orderItem.id.charAt(0).toUpperCase() + orderItem.id.slice(1)
      } Pizza - $${itemTotal.toFixed(2)}`;
      orderItems.appendChild(li);
      total += itemTotal;
    }
  });

  // create display for total price
  const totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: $${total.toFixed(2)}`;
  orderItems.appendChild(totalLi);

  // hide menu area and show order confirmation
  if (menuArea) {
    menuArea.style.display = "none";
  }
  orderConfirmation.style.display = "block";

  // replace submit button with restart button (remove submitOrder handler and instead create a function that handles resetting the order)
  submitButton.textContent = "Restart Order";
  submitButton.removeEventListener("click", handleSubmitOrder);
  submitButton.addEventListener("click", function () {
    // reset visibility of order confirmation and menu area
    orderConfirmation.style.display = "none";
    if (menuArea) {
      menuArea.style.display = "block";
    }
    submitButton.textContent = "Submit Order";

    currentOrder = [];

    // reset all quantity inputs
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.value = 0;
    });

    // remove new handler and replace it with handleSubmitOrder
    submitButton.removeEventListener("click", arguments.callee);
    submitButton.addEventListener("click", handleSubmitOrder);
  });

  // clear current order
  currentOrder = [];
  }

  // attach event to submit order button (function is extracted to be able to easily remove and reattach the handler within the eventListener)
  document
    .querySelector("#submit-order button")
    .addEventListener("click", handleSubmitOrder);
      });
  });
