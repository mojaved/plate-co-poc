# Plates Company Sale System POC

## Technology
 
* CSS, HTML & Vanilla JS
* No frameworks used.

## Database
* Browser local storage

## How to run the program

```
Install VS Code
Go to VS Code extensions and install Live Server extension
Run Live Server
Main file is index.html
```

## A typical project hierarchy and brief explanation

    .
    ├── css                     # Project styling
        ├── style.css
    ├── src                     # Source files
        ├── data.js
            * It contains pre-populated data in the form of array of plates.
        ├── store.js
            1. generateProducts() :It generate cards on the base of plates array and display on the page.
            2. addItemToCart() : add/update the selected item quantity in the local storage of the browser.
            3. calculation() : Calculate the no of items added in the cart and display its count on the header cart icon.
        ├── cart.js
            1. findOddNumbers() : Helper function for finding the odd numbers, this function is used for calculating the special offers.
            2. calculateSpecialDiscount() : Just for calculating the product special offer total.
            3. calculation() : Calculate the no of items added in the cart and display its count on the header cart icon.
            4. generateCartItems(): It generate cart items on the basis of storage data and display it on the cart page.
            5. incrementQuantity(): It increments product cart quantity on the fly.
            6. decrementQuantity(): It decrements product cart quantity on the fly.
            7. totalAmount(): Calculates total amount from the cart, shipping cost and display it on the top of the page.
            8. clearCart(): It removes all the cart items from the carts page and from the storage as well.
            9. removeItem(): It removes the specific cart from the carts page and update the storage.

    ├── images                  # Images used in the application
    ├── index.html              # Home page
    ├── myCart.html             # Shopping cart page
    └── README.md


## Authors

Muhammad Omer Javed

## Version History

* 0.1 Initial Release

## License

This project is free to use.