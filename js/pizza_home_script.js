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

function addToOrder(pizzaId) {
  // only add to order array if pizzaId doesn't already exist, as we don't handle multiple orders of the same pizza yet
  if (!currentOrder.includes(pizzaId)) {
    currentOrder.push(pizzaId);
  }
}

function getCurrentOrder() {
  return currentOrder;
}

const buttons = document.querySelectorAll(".pizza-item button");

// create functionality for "Add to order" button, binding an onClick listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // access closest h1 to get food item name
    const pizzaItem = this.closest(".pizza-item");
    const pizzaName = pizzaItem.querySelector("h1").textContent.toLowerCase();
    const pizza = pizzaMenu.find((p) => p.id === pizzaName);

    // if accessed name exists in pizzaMenu, call addToOrder with pizza.id
    if (pizza) {
      addToOrder(pizza.id);
      console.log("Current order:", getCurrentOrder());
    }
  });
});

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
  currentOrder.forEach((pizzaId) => {
    const pizza = pizzaMenu.find((p) => p.id === pizzaId);
    if (pizza) {
      const li = document.createElement("li");
      li.textContent = `${
        pizzaId.charAt(0).toUpperCase() + pizzaId.slice(1)
      } Pizza - $${pizza.price}`;
      orderItems.appendChild(li);
      total += pizza.price;
    }
  });

  // create display for total price
  const totalLi = document.createElement("li");
  totalLi.style.fontWeight = "bold";
  totalLi.textContent = `Total: $${total.toFixed(2)}`;
  orderItems.appendChild(totalLi);

  // Hide menu area and show order confirmation
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
