// original pizza home script added by Franklin, later modified by other members

let currentOrder = [];
let orderType = null;
const SHIPPING_FEE = 5.0;

const pizzaMenu = [
  { id: "choose your own pizza", price: 10.99 },
  { id: "cheese", price: 9.99 },
  { id: "margherita", price: 10.99 },
  { id: "pepperoni", price: 12.49 },
  { id: "bbq chicken", price: 13.99 },
  { id: "veggie supreme", price: 11.99 },
  { id: "hawaiian", price: 12.29 },
  { id: "strawberry lemonade", price: 7.99 },
  { id: "rasberry lemonade", price: 7.99 },
  { id: "coke", price: 3.99 },
  { id: "pepsi", price: 3.99 },
  { id: "ham sandwich", price: 8.50 },
  { id: "grilled chicken sandwich", price: 8.50 },
  { id: "ceasars salad", price: 6.89 },
  { id: "mediterranean salad", price: 6.89 }
];

document.addEventListener("DOMContentLoaded", function () {
  initializeQuantitySelectors();
  setupOrderSubmission();
  setupViewSwitching();
  updateCartDisplay();
});

// Initialize pizza quantity selectors
function initializeQuantitySelectors() {
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
}

// Setup view switching functionality
function setupViewSwitching() {
  const proceedToCheckoutBtn = document.getElementById(
    "proceed-to-checkout-btn"
  );
  const returnToMenuBtn = document.getElementById("return-to-menu-btn");

  if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener("click", () => {
      if (currentOrder.length === 0) {
        alert(
          "Please add some items to your cart before proceeding to checkout."
        );
        return;
      }
      switchToCheckoutView();
    });
  }

  if (returnToMenuBtn) {
    returnToMenuBtn.addEventListener("click", () => {
      switchToMenuView();
    });
  }
}

// Switch to checkout view
function switchToCheckoutView() {
  const menuView = document.getElementById("menu-view");
  const checkoutView = document.getElementById("checkout-view");
  const menuViewCart = document.getElementById("menu-view-cart");

  if (menuView) menuView.style.display = "none";
  if (menuViewCart) menuViewCart.style.display = "none";
  if (checkoutView) checkoutView.style.display = "block";

  // Make sure checkout form is visible and confirmation is hidden
  showCheckoutForm();
  hideOrderConfirmation();

  // Update checkout order summary
  updateCheckoutOrderSummary();
}

// Switch to menu view
function switchToMenuView() {
  const menuView = document.getElementById("menu-view");
  const checkoutView = document.getElementById("checkout-view");
  const menuViewCart = document.getElementById("menu-view-cart");

  if (menuView) menuView.style.display = "block";
  if (menuViewCart) menuViewCart.style.display = "block";
  if (checkoutView) checkoutView.style.display = "none";
}

// Update checkout order summary
function updateCheckoutOrderSummary() {
  const checkoutOrderItems = document.getElementById("checkout-order-items");
  const checkoutEmptyCart = document.getElementById("checkout-empty-cart");

  if (!checkoutOrderItems) return;

  // Clear existing items
  checkoutOrderItems.innerHTML = "";

  if (currentOrder.length === 0) {
    checkoutEmptyCart.style.display = "block";
    updateCheckoutTotals(0, 0, 0, 0);
    return;
  }

  checkoutEmptyCart.style.display = "none";

  // Add each item to checkout summary
  currentOrder.forEach((orderItem) => {
    const pizza = pizzaMenu.find((p) => p.id === orderItem.id);
    if (pizza) {
      const checkoutItem = createCheckoutItem(orderItem, pizza);
      checkoutOrderItems.appendChild(checkoutItem);
    }
  });

  // Update checkout totals
  updateCheckoutTotalsFromCart();
}

// Create checkout item element
function createCheckoutItem(orderItem, pizza) {
  const checkoutItem = document.createElement("div");
  checkoutItem.className = "checkout-item-container";

  const itemTotal = pizza.price * orderItem.quantity;
  const displayName =
    orderItem.id.charAt(0).toUpperCase() + orderItem.id.slice(1);

  checkoutItem.innerHTML = `
    <div class="checkout-item-content">
      <div class="checkout-item-name">${displayName}</div>
      <div class="checkout-item-details">$${pizza.price.toFixed(2)} × ${
    orderItem.quantity
  }</div>
    </div>
    <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
  `;

  return checkoutItem;
}

// Update checkout totals from current cart
function updateCheckoutTotalsFromCart() {
  let subtotal = 0;

  currentOrder.forEach((orderItem) => {
    const pizza = pizzaMenu.find((p) => p.id === orderItem.id);
    if (pizza) {
      subtotal += pizza.price * orderItem.quantity;
    }
  });

  const discount = getPromotionDiscount ? getPromotionDiscount() : 0;
  const discountAmount = subtotal * discount;
  const shippingFee = orderType === "delivery" ? SHIPPING_FEE : 0;
  const finalTotal = subtotal - discountAmount + shippingFee;

  updateCheckoutTotals(
    subtotal,
    discount,
    discountAmount,
    shippingFee,
    finalTotal
  );
}

// Update checkout totals display
function updateCheckoutTotals(
  subtotal,
  discount,
  discountAmount,
  shippingFee,
  finalTotal = null
) {
  const subtotalElement = document.getElementById("checkout-subtotal");
  const discountRow = document.getElementById("checkout-discount-row");
  const discountElement = document.getElementById("checkout-discount");
  const shippingRow = document.getElementById("checkout-shipping-row");
  const shippingElement = document.getElementById("checkout-shipping");
  const totalElement = document.getElementById("checkout-total");

  if (finalTotal === null) {
    finalTotal = subtotal - discountAmount + shippingFee;
  }

  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${finalTotal.toFixed(2)}`;

  // Show/hide discount row
  if (discount > 0 && discountRow && discountElement) {
    discountRow.style.display = "flex";
    discountElement.textContent = `-$${discountAmount.toFixed(2)}`;
  } else if (discountRow) {
    discountRow.style.display = "none";
  }

  // Show/hide shipping row
  if (shippingFee > 0 && shippingRow && shippingElement) {
    shippingRow.style.display = "flex";
    shippingElement.textContent = `$${shippingFee.toFixed(2)}`;
  } else if (shippingRow) {
    shippingRow.style.display = "none";
  }
}

// Select order type function (called from HTML)
function selectOrderType(type) {
  orderType = type;

  const pickupBtn = document.getElementById("pickup-btn");
  const deliveryBtn = document.getElementById("delivery-btn");
  const addressField = document.getElementById("address-field");

  // Update button styles
  if (pickupBtn && deliveryBtn) {
    pickupBtn.classList.remove("selected");
    deliveryBtn.classList.remove("selected");

    if (type === "pickup") {
      pickupBtn.classList.add("selected");
    } else {
      deliveryBtn.classList.add("selected");
    }
  }

  // Show/hide address field
  if (addressField) {
    addressField.style.display = type === "delivery" ? "block" : "none";
  }

  // Update both cart displays
  updateCartDisplay();
  updateCheckoutOrderSummary();
}

// Make functions globally available
window.selectOrderType = selectOrderType;
window.updateCartDisplay = updateCartDisplay;
window.updateCheckoutOrderSummary = updateCheckoutOrderSummary;

// Update current order based on quantity changes
function updateOrder(selector) {
  const pizzaItem = selector.closest(".pizza-item");
  const pizzaName = pizzaItem.querySelector("h1").textContent.toLowerCase();
  const quantity =
    parseInt(selector.querySelector(".quantity-input").value) || 0;

  currentOrder = currentOrder.filter((item) => item.id !== pizzaName);

  if (quantity > 0) {
    currentOrder.push({ id: pizzaName, quantity });
  }

  // Update both cart displays
  updateCartDisplay();
  updateCheckoutOrderSummary();
}

// Update the cart display in the "Your Order" section
function updateCartDisplay() {
  const cartContainer = document.getElementById("current-order-items");
  const emptyCart = document.getElementById("empty-cart");

  if (!cartContainer) return;

  // Clear existing items (except empty cart message)
  const existingItems = cartContainer.querySelectorAll(".cart-item-container");
  existingItems.forEach((item) => item.remove());

  if (currentOrder.length === 0) {
    emptyCart.style.display = "block";
    updateOrderSummary(0, 0, 0, 0);
    return;
  }

  emptyCart.style.display = "none";

  // Add each item to the cart
  currentOrder.forEach((orderItem) => {
    const pizza = pizzaMenu.find((p) => p.id === orderItem.id);
    if (pizza) {
      const cartItem = createCartItem(orderItem, pizza);
      cartContainer.appendChild(cartItem);
    }
  });

  // Update order summary
  updateOrderSummaryFromCart();
}

// Create a cart item element
function createCartItem(orderItem, pizza) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item-container";
  cartItem.setAttribute("data-item-id", orderItem.id);

  const itemTotal = pizza.price * orderItem.quantity;
  const displayName =
    orderItem.id.charAt(0).toUpperCase() + orderItem.id.slice(1);

  cartItem.innerHTML = `
    <div class="cart-item-header-js">
      <h3 class="cart-item-title-js">${displayName}</h3>
      <span class="cart-item-total-js">$${itemTotal.toFixed(2)}</span>
    </div>
    <div class="cart-item-details-js">
      <p>Price: $${pizza.price.toFixed(2)} each</p>
    </div>
    <div class="cart-item-footer-js">
      <span class="cart-item-qty-js">Qty: ${orderItem.quantity}</span>
      <button class="remove-item-btn-js">
        Remove
      </button>
    </div>
  `;

  // Add event listener for remove button
  const removeBtn = cartItem.querySelector(".remove-item-btn-js");
  removeBtn.addEventListener("click", () => {
    removeFromCart(orderItem.id);
  });

  return cartItem;
}

// Remove item from cart
function removeFromCart(itemId) {
  // Remove from current order
  currentOrder = currentOrder.filter((item) => item.id !== itemId);

  // Update the corresponding quantity selector
  const quantitySelectors = document.querySelectorAll(".quantity-selector");
  quantitySelectors.forEach((selector) => {
    const pizzaItem = selector.closest(".pizza-item");
    const pizzaName = pizzaItem.querySelector("h1").textContent.toLowerCase();

    if (pizzaName === itemId) {
      const input = selector.querySelector(".quantity-input");
      input.value = 0;
    }
  });

  // Update both cart displays
  updateCartDisplay();
  updateCheckoutOrderSummary();
}

// Update order summary from current cart
function updateOrderSummaryFromCart() {
  let subtotal = 0;

  currentOrder.forEach((orderItem) => {
    const pizza = pizzaMenu.find((p) => p.id === orderItem.id);
    if (pizza) {
      subtotal += pizza.price * orderItem.quantity;
    }
  });

  const discount = getPromotionDiscount ? getPromotionDiscount() : 0;
  const discountAmount = subtotal * discount;
  const shippingFee = orderType === "delivery" ? SHIPPING_FEE : 0;
  const finalTotal = subtotal - discountAmount + shippingFee;

  updateOrderSummary(
    subtotal,
    discount,
    discountAmount,
    shippingFee,
    finalTotal
  );
}

// Update the order summary display
function updateOrderSummary(
  subtotal,
  discount,
  discountAmount,
  shippingFee,
  finalTotal = null
) {
  const subtotalElement = document.getElementById("subtotal-amount");
  const discountRow = document.getElementById("discount-row");
  const discountElement = document.getElementById("discount-amount");
  const shippingRow = document.getElementById("shipping-row");
  const shippingElement = document.getElementById("shipping-amount");
  const totalElement = document.getElementById("total-amount");

  if (finalTotal === null) {
    finalTotal = subtotal - discountAmount + shippingFee;
  }

  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${finalTotal.toFixed(2)}`;

  // Show/hide discount row
  if (discount > 0 && discountRow && discountElement) {
    discountRow.style.display = "flex";
    discountElement.textContent = `-$${discountAmount.toFixed(2)}`;
  } else if (discountRow) {
    discountRow.style.display = "none";
  }

  // Show/hide shipping row
  if (shippingFee > 0 && shippingRow && shippingElement) {
    shippingRow.style.display = "flex";
    shippingElement.textContent = `$${shippingFee.toFixed(2)}`;
  } else if (shippingRow) {
    shippingRow.style.display = "none";
  }
}

// Setup order submission handling
function setupOrderSubmission() {
  const submitButton = document.querySelector("#submit-order button");
  if (submitButton) {
    submitButton.addEventListener("click", handleSubmitOrder);
  }
}

// Handle order submission and validation
function handleSubmitOrder() {
  const customerName = document.getElementById("customer-name")?.value;
  const customerAddress = document.getElementById("customer-address")?.value;
  const cardNumber = document.getElementById("card-number")?.value;
  const expirationDate = document.getElementById("expiration-date")?.value;
  const securityCode = document.getElementById("security-code")?.value;

  // Validate required fields
  if (
    !validateOrderInputs(
      customerName,
      customerAddress,
      cardNumber,
      expirationDate,
      securityCode
    )
  ) {
    return;
  }

  displayOrderConfirmation(customerName, customerAddress);
}

// Validate all order inputs
function validateOrderInputs(
  customerName,
  customerAddress,
  cardNumber,
  expirationDate,
  securityCode
) {
  if (currentOrder.length === 0) {
    alert(
      "Your cart is empty. Please add some items before placing your order."
    );
    return false;
  }

  if (!customerName) {
    alert("Please enter your name");
    return false;
  }

  if (orderType === "delivery" && !customerAddress) {
    alert("Please enter your delivery address");
    return false;
  }

  if (orderType === null) {
    alert("Please select pickup or delivery");
    return false;
  }

  return validatePaymentFields(cardNumber, expirationDate, securityCode);
}

// Validate payment fields
function validatePaymentFields(cardNumber, expirationDate, securityCode) {
  // Credit card number validation (13-19 digits)
  if (!/^\d{13,19}$/.test(cardNumber)) {
    alert("Please enter a valid card number (13-19 digits).");
    return false;
  }

  // Expiration date validation (MM/YY format)
  const expDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!expDatePattern.test(expirationDate)) {
    alert("Please enter a valid expiration date in MM/YY format.");
    return false;
  }

  const [month, year] = expirationDate.split("/").map(Number);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    alert("Expiration date cannot be in the past.");
    return false;
  }

  // Security code validation (3 digits)
  if (!/^\d{3}$/.test(securityCode)) {
    alert("Please enter a valid 3 digit security code (CVV).");
    return false;
  }

  return true;
}

// Display order confirmation
function displayOrderConfirmation(customerName, customerAddress) {
  const orderConfirmation = document.getElementById("order-confirmation");
  const orderItems = document.getElementById("order-items");

  if (!orderConfirmation || !orderItems) return;

  orderItems.innerHTML = "";

  // Add customer info
  const orderTypeInfo = document.createElement("p");
  orderTypeInfo.textContent =
    orderType === "pickup"
      ? `Pickup for: ${customerName}`
      : `Delivery to: ${customerName} at ${customerAddress}`;
  orderItems.appendChild(orderTypeInfo);

  // Calculate and display order details
  let subtotal = 0;
  currentOrder.forEach((orderItem) => {
    const pizza = pizzaMenu.find((p) => p.id === orderItem.id);
    if (pizza) {
      const li = document.createElement("li");
      const itemTotal = pizza.price * orderItem.quantity;
      li.textContent = `${orderItem.quantity}x ${
        orderItem.id.charAt(0).toUpperCase() + orderItem.id.slice(1)
      } - $${itemTotal.toFixed(2)}`;
      orderItems.appendChild(li);
      subtotal += itemTotal;
    }
  });

  // Calculate final total
  const discount = getPromotionDiscount ? getPromotionDiscount() : 0;
  const discountAmount = subtotal * discount;
  const shippingFee = orderType === "delivery" ? SHIPPING_FEE : 0;
  const finalTotal = subtotal - discountAmount + shippingFee;

  // Display pricing breakdown
  displayPricingBreakdown(
    orderItems,
    subtotal,
    discount,
    discountAmount,
    shippingFee,
    finalTotal
  );

  // Hide checkout form and show confirmation
  hideCheckoutForm();
  orderConfirmation.style.display = "block";

  // Add restart button
  addRestartButton(orderConfirmation);
}

// Hide checkout form sections
function hideCheckoutForm() {
  const sections = [
    "order-summary-section",
    "order-type-section",
    "checkout-section",
    "promotion-section",
    "payment-section",
    "submit-order-section",
  ];

  sections.forEach((sectionId) => {
    const section =
      document.getElementsByClassName(sectionId)[0] ||
      document.getElementById(sectionId);
    if (section) {
      section.style.display = "none";
    }
  });
}

// Show checkout form sections
function showCheckoutForm() {
  const sections = [
    "order-summary-section",
    "order-type-section",
    "checkout-section",
    "promotion-section",
    "payment-section",
    "submit-order-section",
  ];

  sections.forEach((sectionId) => {
    const section =
      document.getElementsByClassName(sectionId)[0] ||
      document.getElementById(sectionId);
    if (section) {
      section.style.display = "block";
    }
  });

  // Hide address field by default (will be shown if delivery is selected)
  const addressField = document.getElementById("address-field");
  if (addressField && orderType !== "delivery") {
    addressField.style.display = "none";
  }
}

// Hide order confirmation
function hideOrderConfirmation() {
  const orderConfirmation = document.getElementById("order-confirmation");
  if (orderConfirmation) {
    orderConfirmation.style.display = "none";
  }
}

// Display pricing breakdown
function displayPricingBreakdown(
  orderItems,
  subtotal,
  discount,
  discountAmount,
  shippingFee,
  finalTotal
) {
  if (discount > 0) {
    const subtotalLi = document.createElement("li");
    subtotalLi.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    orderItems.appendChild(subtotalLi);

    const discountLi = document.createElement("li");
    discountLi.textContent = `Discount (25%): -$${discountAmount.toFixed(2)}`;
    discountLi.style.color = "green";
    orderItems.appendChild(discountLi);
  } else if (shippingFee > 0) {
    const subtotalLi = document.createElement("li");
    subtotalLi.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    orderItems.appendChild(subtotalLi);
  }

  if (shippingFee > 0) {
    const shippingLi = document.createElement("li");
    shippingLi.textContent = `Shipping Fee: $${shippingFee.toFixed(2)}`;
    orderItems.appendChild(shippingLi);
  }

  const totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: $${finalTotal.toFixed(2)}`;
  orderItems.appendChild(totalLi);
}

// Add restart button to order confirmation
function addRestartButton(orderConfirmation) {
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Place Another Order";
  restartBtn.className = "restart-order-btn";
  orderConfirmation.appendChild(restartBtn);

  restartBtn.addEventListener("click", function () {
    resetOrder();
    hideOrderConfirmation();
    switchToMenuView();
    restartBtn.remove();
  });
}

// Reset order to initial state
function resetOrder() {
  currentOrder = [];
  orderType = null;

  // Reset all quantity inputs
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.value = 0;
  });

  // Reset form fields
  const fields = [
    "customer-name",
    "customer-phone",
    "customer-address",
    "card-number",
    "expiration-date",
    "security-code",
  ];
  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) field.value = "";
  });

  // Reset order type buttons
  const pickupBtn = document.getElementById("pickup-btn");
  const deliveryBtn = document.getElementById("delivery-btn");
  if (pickupBtn) pickupBtn.classList.remove("selected");
  if (deliveryBtn) deliveryBtn.classList.remove("selected");

  // Hide address field
  const addressField = document.getElementById("address-field");
  if (addressField) addressField.style.display = "none";

  // Reset promotion code if function exists
  if (typeof window.resetPromotionCode === "function") {
    window.resetPromotionCode();
  }

  // Hide order confirmation
  hideOrderConfirmation();

  // Update both cart displays
  updateCartDisplay();
  updateCheckoutOrderSummary();
}

// Update cart when order type changes (for shipping calculation)
function updateOrderType(type) {
  orderType = type;
  updateCartDisplay();
  updateCheckoutOrderSummary();
}
