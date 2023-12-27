import { cart, saveToStorage, updateCartDate } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js"
import { addToOrders } from "../../data/orderItems.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { renderOrderSummary } from "./orderSummary.js";
import { renderCheckOutHeader } from "./checkoutHeader.js";
export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;


    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        shippingPriceCents += deliveryOption.priceCents
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const TaxCents = totalBeforeTaxCents * 10 / 100;
    const TotalCents = totalBeforeTaxCents + TaxCents;


    const paymentSummaryHtml = `
    
    <div class="payment-summary-title">
    Order Summary
    </div>
    
    <div class="payment-summary-row">
    <div>Items (${cart.length}):</div>
    <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>
    
    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>
    
    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>
    
    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
    </div>
    
    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(TotalCents)}</div>
    </div>
    
    <button class="place-order-button button-primary js-place-order-button" id="placeOrder">
    Place your order
    </button>
    
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    if (cart.length === 0) {
        var myButton = document.getElementById('placeOrder');
        myButton.disabled = true;
    }

    document.querySelector('.js-place-order-button').addEventListener('click', () => {
        let orderPlaced = dayjs();
        const orderPlacedToday = orderPlaced.format('dddd, DD MMMM  YYYY')
        addToOrders(TotalCents, orderPlacedToday, cart);
        cart.length = 0;
        renderCheckOutHeader();
        renderOrderSummary();
        renderPaymentSummary();
        saveToStorage();
        window.location.href = 'orders.html';
    })
}

