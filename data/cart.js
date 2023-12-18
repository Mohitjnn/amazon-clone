export const cart =[];

export function addToCart(productId, quantity, productName) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if
        (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })
  
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        productName,
        quantity
      });
    }
  
  }
  