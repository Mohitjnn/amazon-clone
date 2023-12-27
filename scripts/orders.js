import { order as Orders, returnProductQuantity } from "../data/orderItems.js"
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"
import { updateCartValue } from "../data/cart.js";
import { addToCart } from "../data/cart.js";


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
                <div class="product-delivery-date">
                Arriving on: ${deliveryDate}
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

    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener("click", () => {
            const { productId } = button.dataset;
            const { orderId } = button.dataset;
            const quantity = returnProductQuantity(productId, orderId);
            const matchingProduct = getProduct(productId);
            ;

            // var buyAgain = button.querySelector('.js-buy-again-message');





            addToCart(productId, quantity, matchingProduct.name);



            renderOrder();
        })

        // button.addEventListener('click', () => {

        //     const buyAgainMessage = button.querySelector('.js-buy-again-message');
        //     const buyAgainSuccess = button.querySelector('.buy-again-success');
        //     const buyAgainImage = button.querySelector('.buy-again-icon');

        //     console.log(buyAgainMessage);
        //     console.log(buyAgainSuccess);
        //     console.log(buyAgainImage);
        //     buyAgainImage.classList.add("added-to-cart");
        //     buyAgainMessage.classList.add("added-to-cart");
        //     buyAgainSuccess.classList.add("added-to-cart");
        //     setTimeout(() => {

        //         buyAgainImage.classList.remove("added-to-cart");
        //         buyAgainMessage.classList.remove("added-to-cart");
        //         buyAgainSuccess.classList.remove("added-to-cart");

        //         console.log(buyAgainMessage);
        //         console.log(buyAgainSuccess);
        //         console.log(buyAgainImage);
        //         buyAgainImage.classList.add("added-to-cart");


        //     }, 2000)


        // // Show the success message
        // buyAgainMessage.style.display = 'none';
        // buyAgainSuccess.style.display = 'inline-block';

        // // Set a timeout to hide the success message after 2 seconds
        // setTimeout(() => {
        //     buyAgainMessage.style.display = 'inline-block';
        //     buyAgainSuccess.style.display = 'none';
        // }, 2000);

        //})
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
