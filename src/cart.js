let shoppingCart = document.getElementById("shopping-cart");
let labelTotal = document.getElementById("lblTotal");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const updateCalculations = () => {
  calculation();
  generateCartItems();
  totalAmount();
};

/**
 * ! Counting the number of full price Items for special discount
 */
const countEvenItems = (e) => {
  let arr = Array.from({ length: e }, (_, i) => i + 1);
  return arr.filter((n) => n % 2).length;
};

/**
 * ! Calculating the special discount
 */
const specialDiscount = (price, items) => {
  const fullPriceItems = countEvenItems(items);
  const dscItems = items - fullPriceItems;
  const halfPrice = price / 2;
  const totalPrice = halfPrice * dscItems + price * fullPriceItems;
  return totalPrice;
};

/**
 * ! Calculating the total cart items as a badge on header
 */

const calculation = () => {
  let cartIcon = document.getElementById("cartCounter");
  cartIcon.innerHTML = basket.reduce((x, y) => x + y.quantity, 0);
};

/**
 * ! Generating the carts as per product added in the cart
 */

const generateCartItems = () => {
  if (basket.length > 0) {
    shoppingCart.innerHTML = basket
      .map((x) => {
        let { code, quantity } = x;
        let search = plates.find((x) => x.code === code) || {};
        let { image, price, name } = search;
        return `
        <div class="plate-co-cart-item">
          <img width="100" src=${image} alt="" />
  
          <div class="plate-co-shop-card-details">
          
            <div class="plate-co-title-price-x">
              <h4 class="plate-co-title-price">
                <p>${name}</p>
                <p class="plate-co-cart-item-price">$ ${price}</p>
              </h4>
              <i onclick="removeItem('${code}')" class="fa fa-remove"></i>
            </div>
  
            <div class="cart-buttons">
              <div class="plate-co-shop-card-buttons">
                <i onclick="adjustQuantity('${code}','-')" class="fa fa-minus"></i>
                <div id=${code} class="quantity">${quantity}</div>
                <i onclick="adjustQuantity('${code}','+')" class="fa fa-plus"></i>
              </div>
            </div>
  
            <h3>$ ${(code === "R01"
              ? specialDiscount(price, quantity)
              : quantity * price
            )
              .toFixed(3)
              .slice(0, -1)}</h3>
          
          </div>
        </div>
        `;
      })
      .join("");
  } else {
    shoppingCart.innerHTML = "";
    labelTotal.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
      </a>
      `;
  }
};

/**
 * ! Increment/Decrement the selected product quantity by 1
 */

const adjustQuantity = (code, operator) => {
  let search = basket.find((x) => x.code === code);
  switch (operator) {
    case "+":
      if (!search) {
        basket.push({
          id: selectedItem.id,
          quantity: 1,
        });
      } else {
        search.quantity += 1;
      }
      break;
    case "-":
      if (!search || search.quantity === 0) {
        return;
      } else {
        search.quantity -= 1;
      }
      break;
    default:
      break;
  }

  updateCalculations();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Calculate total amount of the selected Products with shipment charges and special discounts
 */

const totalAmount = () => {
  if (basket.length > 0) {
    let amount = basket
      .reduce((acc, item) => {
        let { code, quantity } = item;
        let filterData = plates.find((x) => x.code === code);
        if (code === "R01") {
          return acc + specialDiscount(filterData.price, quantity);
        } else {
          return acc + filterData.price * quantity;
        }
      }, 0)
      .toFixed(3)
      .slice(0, -1);

    let shipmentAmount = 0;
    if (Number(amount) < 50 && Number(amount) > 0) {
      shipmentAmount = 4.95;
    } else if (Number(amount) > 50 && Number(amount) < 90) {
      shipmentAmount = 2.95;
    }
    return (labelTotal.innerHTML = `
      <h2>Sub Total : $ ${amount}</h2>
      <h2>Shipment Charges : $ ${shipmentAmount}</h2>
      <h2>Total Bill : $ ${(Number(amount) + shipmentAmount)
        .toFixed(3)
        .slice(0, -1)}</h2>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `);
  }
};

updateCalculations();
// totalAmount();

/**
 * ! Used to clear the cart at once
 */

const clearCart = () => {
  basket = [];
  updateCalculations();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Remove cart items
 */

const removeItem = (code) => {
  basket = basket.filter((x) => x.code !== code);
  updateCalculations();
  localStorage.setItem("data", JSON.stringify(basket));
};
