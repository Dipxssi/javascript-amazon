// if object name changes suddenly we would write **this** to avoid conflicts
function Cart(localStorageKey){
  const cart = {
    cartItems : undefined,
    //func inside a object = method
    //shortcut 
     loadFromStorage(){
     this.cartItems =JSON.parse(localStorage.getItem(localStorageKey));
   
     if (!this.cartItems) {
         this.cartItems = [{
           productId : //De-duplicating data or normalizing
           'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
           quantity: 2,
           deliveryOptionId : '1'
        },{
          productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId : '2'
        }];
     }
   },
   saveToStorage() {
     localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
 },
 
  addToCart(productId, selectorQuantity) {
   let matchingItem;
  this.cartItems.forEach((cartItem) => {
         if(productId === cartItem.productId) {
            matchingItem = cartItem;
         }
   });
 
   if (matchingItem){
       matchingItem.quantity += selectorQuantity;
   } else {
    this.cartItems.push({
      productId : productId,
      quantity : selectorQuantity,
      deliveryOptionId : '1'
     });
   }
  this. saveToStorage();
 },
  removefromCart(productId) {
   const newCart = [];
 
   this.cartItems.forEach((cartItem) => {
     if (cartItem.productId !== productId) {
       newCart.push(cartItem);
     }
   });
   this.cartItems = newCart;
   this.saveToStorage();
 },
 updateDeliveryOption (productId , deliveryOptionId) {
   let matchingItem;
   this.cartItems.forEach((cartItem) => {
         if(productId === cartItem.productId) {
            matchingItem = cartItem;
         }
   });
 
   matchingItem.deliveryOptionId = deliveryOptionId;
 
   this.saveToStorage();
 }
 
 };
 return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();
//OOPS tries to represent the real world
console.log(cart);
console.log(businessCart);

