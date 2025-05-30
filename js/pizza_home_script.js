// original pizza home script added by Franklin, later modified by other members

let currentOrder = [];
let orderType = null;
const SHIPPING_FEE = 5.0; // $5 shipping fee for delivery orders

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
    orderType = "pickup";
    document.getElementById("address-field").style.display = "none";
    addressField.disabled = true;
    orderNowBtn.textContent = "Pickup Selected";
    closeOrderModal();
  });

  // Handle delivery selection
  deliveryBtn.addEventListener("click", function () {
    orderType = "delivery";
    document.getElementById("address-field").style.display = "block";
    addressField.disabled = false;
    orderNowBtn.textContent = "Delivery Selected";
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
    const quantity =
      parseInt(selector.querySelector(".quantity-input").value) || 0;

    currentOrder = currentOrder.filter((item) => item.id !== pizzaName);

    if (quantity > 0) {
      currentOrder.push({ id: pizzaName, quantity });
    }
  }

  // handles both submitting order and allowing user to restart order
  function handleSubmitOrder() {
    const orderConfirmation = document.getElementById("order-confirmation");
    const orderItems = document.getElementById("order-items");
    const menuArea = document.querySelector(".menu-area");
    const submitButton = document.querySelector("#submit-order button");
    const userDetails = document.getElementById("user-details");
    const addressField = document.getElementById("address-field");
    const promotionField = document.getElementById("promotion-field");
    const promotionMessage = document.getElementById("promotion-message");
    const customerName = document.getElementById("customer-name").value;
    const customerAddress = document.getElementById("customer-address").value;
    let total = 0;

    // validates while considering order type (no need for address if pickup)
    if (!customerName) {
      alert("Please enter your name");
      return;
    }

    if (orderType === "delivery" && !customerAddress) {
      alert("Please enter your delivery address");
      return;
    }

    if (orderType === null) {
      alert("Please select pickup or delivery first");
      return;
    }

    orderItems.innerHTML = "";

    // changes the text based on whether pickup or delivery
    const orderTypeInfo = document.createElement("p");
    if (orderType === "pickup") {
      orderTypeInfo.textContent = `Pickup for: ${customerName}`;
    } else {
      orderTypeInfo.textContent = `Delivery to: ${customerName} at ${customerAddress}`;
    }
    orderItems.appendChild(orderTypeInfo);

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
    const subtotal = total;
    const discount = getPromotionDiscount();
    const discountAmount = subtotal * discount;
    const shippingFee = orderType === "delivery" ? SHIPPING_FEE : 0;
    const finalTotal = subtotal - discountAmount + shippingFee;

    if (discount > 0) {
      const subtotalLi = document.createElement("li");
      subtotalLi.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
      orderItems.appendChild(subtotalLi);

      const discountLi = document.createElement("li");
      discountLi.textContent = `Discount (25%): -$${discountAmount.toFixed(2)}`;
      discountLi.style.color = "green";
      orderItems.appendChild(discountLi);
    } else {
      // Show subtotal even without discount if there's shipping
      if (shippingFee > 0) {
        const subtotalLi = document.createElement("li");
        subtotalLi.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        orderItems.appendChild(subtotalLi);
      }
    }

    // Add shipping fee if applicable
    if (shippingFee > 0) {
      const shippingLi = document.createElement("li");
      shippingLi.textContent = `Shipping Fee: $${shippingFee.toFixed(2)}`;
      orderItems.appendChild(shippingLi);
    }

    const totalLi = document.createElement("li");
    totalLi.style.fontWeight = "bold";
    totalLi.textContent = `Total: $${finalTotal.toFixed(2)}`;
    orderItems.appendChild(totalLi);

    // hide menu area, user inputs, submit button and show order confirmation
    if (menuArea) {
      menuArea.style.display = "none";
    }
    userDetails.style.display = "none";
    addressField.style.display = "none";
    promotionField.style.display = "none";
    promotionMessage.style.display = "none";
    document.getElementById("submit-order").style.display = "none";
    orderConfirmation.style.display = "block";

    // create restart button below order confirmation
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Order";
    restartBtn.className = "order-button";
    restartBtn.style.marginTop = "20px";
    orderConfirmation.appendChild(restartBtn);

    restartBtn.addEventListener("click", function () {
      // reset visibility of all sections
      orderConfirmation.style.display = "none";
      if (menuArea) {
        menuArea.style.display = "block";
      }
      userDetails.style.display = "block";

      if (orderType === "delivery") {
        addressField.style.display = "block";
      }
      promotionField.style.display = "block";
      promotionMessage.style.display = "block";
      document.getElementById("submit-order").style.display = "block";

      currentOrder = [];
      orderType = null; // Reset order type
      orderNowBtn.textContent = "Choose Order Type"; // Reset order button text

      // reset all quantity inputs
      document.querySelectorAll(".quantity-input").forEach((input) => {
        input.value = 0;
      });

      // reset, including removing the button and clearing the inputs
      document.getElementById("customer-name").value = "";
      document.getElementById("customer-address").value = "";

      // Reset promotion code
      if (typeof window.resetPromotionCode === "function") {
        window.resetPromotionCode();
      }

      restartBtn.remove();
    });

    // clear current order
    currentOrder = [];
  }

  // attach event to submit order button (function is extracted to be able to easily remove and reattach the handler within the eventListener)
  document
    .querySelector("#submit-order button")
    .addEventListener("click", handleSubmitOrder);
});
