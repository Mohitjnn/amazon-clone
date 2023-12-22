import { order as Orders } from "../data/orderItems.js"
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"

let Ordercontainer = ``;
let gridContainer = document.querySelector('.orders-grid');

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
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>
            
            <div class="product-actions">
                <a href="tracking.html">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>    
                
    `;

    });
      
    Ordercontainer += ` 
     <div class="order-container">
        <div class="order-header">${orderHeader}</div>
        <div class="order-details-grid">${orderItems}</div> 
      </div>
      `

});

gridContainer.innerHTML = Ordercontainer;

