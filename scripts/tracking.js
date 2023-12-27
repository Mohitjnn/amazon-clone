import { returnOrderProduct, returnOrder } from "../data/orderItems.js";
import { getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { cart } from "../data/cart.js";

function renderPacking() {

    const tracking = JSON.parse(localStorage.getItem('tracking'))
    const productId = tracking.pid;
    const orderId = tracking.oid;
    const product = returnOrderProduct(productId, orderId);
    const dDate = product.deliveryDate;
    const matchingProduct = getProduct(productId);
    const info = product.productName;
    const Quantity = product.quantity;
    const productImage = matchingProduct.image;
    const Order = returnOrder(orderId);
    localStorage.removeItem('tracking');

    document.querySelector('.cart-quantity').innerHTML = `${cart.length}`;

    let innerHTML = `
    
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>
            
            <div class="delivery-date">
            Arriving on ${dDate}
            </div>
            
            <div class="product-info">
            ${info}
            </div>
            
            <div class="product-info">
            Quantity: ${Quantity}
            </div>
            
            <img class="product-image" src="${productImage}">
            
            <div class="progress-labels-container">
            <div class="progress-label" Id="Preparing">
            Preparing
            </div>
            <div class="progress-label" Id="Shipped">
            Shipped
            </div>
            <div class="progress-label" Id="Delivered">
            Delivered
            </div>
            </div>
            
            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
            
            
            `;

    document.querySelector('.order-tracking').innerHTML = innerHTML;



    progressBar(Order.OrderPlaced, dDate);

    function progressBar(OrderPlaced, dDate) {
        const today = dayjs();
        const tDate = today.format('dddd, DD MMMM YYYY');
        console.log(tDate);

        const pRate = {
            preparing: document.getElementById('Preparing'),
            shipped: document.getElementById('Shipped'),
            delivered: document.getElementById('Delivered')
        }

        let progress = document.querySelector('.progress-bar')

        const orderPlacedDate = dayjs(OrderPlaced, { format: 'dddd, DD MMMM YYYY' });
        const deliveryDate = dayjs(dDate, { format: 'dddd, DD MMMM YYYY' });

        if (today.isAfter(deliveryDate)) {
            pRate.delivered.classList.add('current-status')
            progress.style.width = "100%"

        } else if (today.isBefore(deliveryDate) && !today.isSame(orderPlacedDate, 'day')) {
            pRate.shipped.classList.add('current-status');
            progress.style.width = "50%"

        } else if (today.isSame(orderPlacedDate, 'day')) {
            pRate.preparing.classList.add('current-status')
            progress.style.width = "10%"

        }

    }

}

renderPacking();
