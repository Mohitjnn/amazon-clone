import { order as Orders, returnProductQuantity, returnOrderProduct } from "../data/orderItems.js"
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"
import { updateCartValue } from "../data/cart.js";
import { addToCart } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"


function renderOrder() {

    let Ordercontainer = ``;
    let gridContainer = document.querySelector('.orders-grid');
    document.querySelector('.cart-quantity').innerHTML = updateCartValue();

    Orders.forEach((Order) => {
        let products = Order.cart;
        let orderItems = ``;
        let orderHeader = ``;

        orderHeader = `
          
            <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${Order.OrderPlaced}</div>
             </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(Order.OrderTotalCents)}</div>
             </div>
            </div>
            
            <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
              <div>${Order.OrderId}</div>
            </div>
        
    `

        products.forEach((product) => {
            const productId = product.productId;
            const matchingProduct = getProduct(productId);
            const deliveryDate = product.deliveryDate;
            const quantity = product.quantity;

            orderItems += `

        <div class="product-image-container">
        <img src="${matchingProduct.image}">
            </div>
            
            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date" data-product-id = "${matchingProduct.id}" data-order-id = "${Order.OrderId}">
                Arriving on : ${deliveryDate}
                </div>
                <div class="product-quantity">
                    Quantity: ${quantity}
                </div>

                <button class="buy-again-button button-primary js-buy-again-button" data-product-id = "${matchingProduct.id}" data-order-id = "${Order.OrderId}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message js-buy-again-message">Buy it again</span>
                </button>
                </div>
                
                <div class="product-actions">
                <a href="tracking.html">
                <button class="track-package-button button-secondary" data-product-id = "${matchingProduct.id}" data-order-id = "${Order.OrderId}">
                Track package
                </button>
                </a>
                </div>    
                
                `;


        });

        Ordercontainer += ` 
            <div class="order-container js-order-container-${Order.OrderId}">
            <div class="order-header">${orderHeader}</div>
            <div class="order-details-grid">${orderItems}</div> 
            </div>
            `

    });

    gridContainer.innerHTML = Ordercontainer;

    document.querySelectorAll('.product-delivery-date').forEach((deliveryDate) => {
        const { productId } = deliveryDate.dataset;
        const { orderId } = deliveryDate.dataset;
        const matchingProduct = returnOrderProduct(productId, orderId);
        const tDate = dayjs();
        const dDate = dayjs(matchingProduct.deliveryDate, { format: 'dddd, DD MMMM YYYY' })

        if (tDate.isAfter(dDate)) {
            deliveryDate.innerHTML = `Delivered on : ${matchingProduct.deliveryDate}`
        }



    })

    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener("click", () => {
            const { productId } = button.dataset;
            const { orderId } = button.dataset;
            const quantity = returnProductQuantity(productId, orderId);
            const matchingProduct = getProduct(productId);
            ;

            addToCart(productId, quantity, matchingProduct.name);

            renderOrder();
        })
    })


    document.querySelectorAll('.track-package-button').forEach((trackPackage) => {


        trackPackage.addEventListener("click", () => {

            const { productId } = trackPackage.dataset;
            console.log(productId);
            const { orderId } = trackPackage.dataset;
            console.log(orderId);

            let tracking = {
                pid: productId,
                oid: orderId
            }
            localStorage.setItem('tracking', JSON.stringify(tracking));


        })

    })
}

renderOrder();
