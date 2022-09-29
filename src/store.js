let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generating the products store cards
 */

(() => {
  shop.innerHTML = plates
    .map((item) => {
      let { code, name, image, price } = item;
      return `
      <div id=product-id-${code} class="plate-co-shop-card-item">
        <img width="220" src=${image} alt="">
        <div class="plate-co-shop-card-details">
          <h4>${name}</h4>
            <h4>$ ${price} </h4>
            <button onclick="addItemToCart('${code}')" class="HomeBtn"> Add to Cart</button>
        </div>
    </div>
      `;
    })
    .join("");
})();

/**
 * ! Adding items to the cart
 */

const addItemToCart = (code) => {
  let search = basket.find((x) => x.code === code);
  if (search === undefined) {
    basket.push({
      code: code,
      quantity: 1,
    });
  } else {
    search.quantity += 1;
  }

  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! Calculating the total cart items as a badge on header
 */

const calculation = () => {
  let cartIcon = document.getElementById("cartCounter");
  cartIcon.innerHTML = basket.reduce((x, y) => x + y.quantity, 0);
};

calculation();
