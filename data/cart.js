export const cart = [];

export function addToCart(productId, selectorQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
           matchingItem = item;
        }
  });

  if (matchingItem){
      matchingItem.quantity += selectorQuantity;
  } else {
   cart.push({
     productId : productId,
     quantity : selectorQuantity
    });
  }
}
