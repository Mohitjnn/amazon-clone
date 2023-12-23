
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

