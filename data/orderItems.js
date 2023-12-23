
export const order = JSON.parse(localStorage.getItem('Orders')) || []
// [{
//         OrderId: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
//         OrderTotalCents: 3506,
//         OrderPlaced: 'August 12',
//         cart: [{
//                 productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//                 productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//                 quantity: 1,
//                 deliveryOptionId: '3',
//                 deliveryDate: 'August 15'
//         }, {
//                 productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
//                 productName: "Adults Plain Cotton T-Shirt - 2 Pack",
//                 quantity: 2,
//                 deliveryOptionId: '1',
//                 deliveryDate: 'August 19'
//         }]
// }, {
//         OrderId: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
//         OrderTotalCents: 4190,
//         OrderPlaced: 'June 10',
//         cart: [{
//                 productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//                 productName: "Intermediate Size Basketball",
//                 quantity: 2,
//                 deliveryOptionId: '1',
//                 deliveryDate: 'June 17'
//         }]

// }]


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

