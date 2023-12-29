import { cart, addToCart, updateCartValue } from "../data/cart.js";
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";



let productshtml = ''
products.forEach((product) => {
  productshtml += ` 
      <div class="product-container" data-product-id = "${product.id}">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class ="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}" data-product-name = "${product.name}" >
        Add to Cart
      </button>
    </div>
    `
})
document.querySelector('.js-product-grid').innerHTML = productshtml;

document.querySelector('.cart-quantity').innerHTML = updateCartValue();



function addButton(addedImage) {

  let addedImageTimeoutId;

  addedImage.classList.add('hidden-added');
  if (addedImageTimeoutId) {
    clearTimeout(addedImageTimeoutId)
  }

  const timeoutId = setTimeout(() => addedImage.classList.remove('hidden-added'), 2000);

  addedImageTimeoutId = timeoutId;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;
    const productCount = document.querySelector(`.js-quantity-selector-${productId}`)

    let quantity = productCount.value;
    quantity = Number(quantity);

    const { productName } = button.dataset;

    const addedImage = document.querySelector(`.js-added-to-cart-${productId}`);
    addToCart(productId, quantity, productName);
    addButton(addedImage);
    document.querySelector('.cart-quantity').innerHTML = updateCartValue();
  })
});

let list = [];

const inputValue = document.querySelector('[data-search-bar]');

inputValue.addEventListener('input', (e) => {

  const value = e.target.value.toLowerCase();
  list.forEach((listItem) => {
    const prodTemplate = document.querySelector(`[data-product-id = "${listItem.Id}"]`);
    const isVisible = listItem.name.toLowerCase().includes(value) || listItem.keywords.some((keyword) => {
      return keyword.toLowerCase().includes(value);
    })
    prodTemplate.classList.toggle("hide", !isVisible);
  })

})

fetch("../backend/products.json").then(Response =>
  Response.json()
).then(data => {
  list = data.map(listItem => {
    return { name: listItem.name, keywords: listItem.keywords, Id: listItem.id }

  })
})