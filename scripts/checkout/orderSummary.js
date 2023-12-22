import { cart, removeFromCart, updateCartQuantity, updateDeliveryOption, updateCartDate } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckOutHeader } from "./checkoutHeader.js";
export function renderOrderSummary() {
    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

        updateCartDate(productId, dateString);

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}   
                </div>
                
                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">
                    
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-id ="${matchingProduct.id}">
                                Update
                            </span>
                            <input class="quantity-input js-quantity-input  js-quantity-input-${matchingProduct.id}" data-product-id ="${matchingProduct.id}">
                            <span class = "save-quantity-link link-primary js-save-quantity-link"data-product-id ="${matchingProduct.id}">
                                Save
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link"  data-product-id ="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>
                
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;



    renderCheckOutHeader();
    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');

        });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
        link.addEventListener("click", () => {
            const { productId } = link.dataset;

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

            const newQuantityInput = Number(quantityInput.value);

            updatingQuantity(newQuantityInput, productId);

        });
    })

    document.querySelectorAll('.js-quantity-input').forEach((inputValue) => {
        inputValue.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const { productId } = inputValue.dataset;

                const newQuantityInput = Number(inputValue.value);

                updatingQuantity(newQuantityInput, productId);
            }
        });
    });



    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            removeFromCart(productId);

            renderCheckOutHeader();//mvc
            renderOrderSummary(); //mvc

            renderPaymentSummary();//mvc
        })
    });

    function updatingQuantity(newQuantityInput, productId) {
        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        if (newQuantityInput >= 0 && newQuantityInput < 1000) {

            updateCartQuantity(productId, newQuantityInput)

            container.classList.remove('is-editing-quantity');

            renderOrderSummary();//mvc
        }

        else {
            alert('please enter value between 1-1000');
        }
    }

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = ``;
        deliveryOptions.forEach((deliveryOption) => {

            const dateString = calculateDeliveryDate(deliveryOption);

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `

                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}"
                >
                <input type="radio" 
                ${isChecked ? 'checked' : ''} 
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
                </div>
                </div>
            
            `;

        });

        return html;
    }

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    })
}

renderOrderSummary();


// This page shows an example of mvc that is model view control.  where html model is generated
//  1. save and managing of data
// 2. takes the data and display on page
// 3. do something when we interact with the page
// makes sure that the data matches the desgin
// it is  desgin pattern