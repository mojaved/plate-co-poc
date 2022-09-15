let shoppingCart = document.getElementById("shopping-cart");
let labelTotal = document.getElementById("lblTotal");

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Finding the number of odd Items for special discount
 */
let findOddNumbers = (s, e) => {
  let arr = [];
  while (s <= e) {
    arr.push(s);
    s += 1;
  }
  return arr.filter((n) => n % 2).length;
};

/**
 * ! Calculating the special discount
 */
let calculateSpecialDiscount = (price, items) => {
  const fullPriceItems = findOddNumbers(1, items);
  const dscItems = items - fullPriceItems;
  const halfPrice = price / 2;
  const totalPrice = halfPrice * dscItems + price * fullPriceItems;
  return totalPrice;
};

/**
 * ! Calculating the total cart items as a badge on header
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartCounter");
  cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
};

calculation();

/**
 * ! Generating the carts as per product added in the cart
 */

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { code, quantity } = x;
        let search = plates.find((x) => x.code === code) || [];
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
                <i onclick="decrementQuantity('${code}')" class="fa fa-minus"></i>
                <div id=${code} class="quantity">${quantity}</div>
                <i onclick="incrementQuantity('${code}')" class="fa fa-plus"></i>
              </div>
            </div>
  
            <h3>$ ${(code === "R01"
              ? calculateSpecialDiscount(price, quantity)
              : quantity * price
            ).toFixed(2)}</h3>
          
          </div>
        </div>
        `;
      })
      .join(""));
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

generateCartItems();

/**
 * ! Increment the selected product quantity by 1
 */

let incrementQuantity = (code) => {
  let search = basket.find((x) => x.code === code);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      quantity: 1,
    });
  } else {
    search.quantity += 1;
  }
  calculation();
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Decrement the selected product quantity by 1
 */

let decrementQuantity = (code) => {
  let search = basket.find((x) => x.code === code);

  if (search === undefined) return;
  else if (search.quantity === 0) return;
  else {
    search.quantity -= 1;
  }

  basket = basket.filter((x) => x.quantity !== 0);
  calculation();
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Calculate total amount of the selected Products with shipment charges and special discounts
 */

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((item) => {
        let { code, quantity } = item;
        let filterData = plates.find((x) => x.code === code);
        if (code === "R01") {
          return calculateSpecialDiscount(filterData.price, quantity);
        } else {
          return filterData.price * quantity;
        }
      })
      .reduce((x, y) => x + y, 0)
      .toFixed(2);

    let shipmentAmount = 0;
    if (Number(amount) < 50 && Number(amount) > 0) {
      shipmentAmount = 4.95;
    } else if (Number(amount) > 50 && Number(amount) < 90) {
      shipmentAmount = 2.95;
    }
    return (labelTotal.innerHTML = `
      <h2>Sub Total : $ ${amount}</h2>
      <h2>Shipment Charges : $ ${shipmentAmount.toFixed(2)}</h2>
      <h2>Total Bill : $ ${(Number(amount) + shipmentAmount).toFixed(2)}</h2>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `);
  } else return;
};

totalAmount();

/**
 * ! Used to clear the cart at once
 */

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Remove cart items
 */

let removeItem = (code) => {
  basket = basket.filter((x) => x.code !== code);
  calculation();
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};
