
export const order = JSON.parse(localStorage.getItem('Orders')) || []

export function addToOrders(OrderTotalCents, OrderPlaced, cart) {
        let OrderId = crypto.randomUUID();
        console.log(OrderId);
        console.log(OrderPlaced);
        console.log(cart);
        const newOrder = {
                OrderId,
                OrderTotalCents,
                OrderPlaced,
                cart
        }

        order.push(newOrder);
        saveOrderToStorage();

}

export function saveOrderToStorage() {
        localStorage.setItem('Orders', JSON.stringify(order));
}

export function returnProductQuantity(productId, orderId) {
        let matchingQuantity;

        order.forEach((OrderElement) => {
                if (OrderElement.OrderId === orderId) {
                        let products = OrderElement.cart;
                        products.forEach((product) => {
                                if (product.productId === productId) {
                                        matchingQuantity = product.quantity;
                                }
                        })
                }
        });

        return matchingQuantity
}
export function returnOrderProduct(productId, orderId) {
        let matchingProduct;

        order.forEach((OrderElement) => {
                if (OrderElement.OrderId === orderId) {
                        let products = OrderElement.cart;
                        products.forEach((product) => {
                                if (product.productId === productId) {
                                        matchingProduct = product;
                                }
                        })
                }
        });

        return matchingProduct;
}

export function returnOrder(orderId) {
        let matchingOrder;

        order.forEach((OrderElement) => {
                if (OrderElement.OrderId === orderId) {
                        matchingOrder = OrderElement;
                }

        })

        return matchingOrder;

}