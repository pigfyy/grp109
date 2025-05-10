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
