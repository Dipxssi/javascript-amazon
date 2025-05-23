//each object we generate from the class is an instance of the class

//classes help us generate these objects
//class = object generator
//constructor a feature of class lets us put the setup code inside the class

//this points to the object we generate
class Cart {
  cartItems ;//public property
  #localStorageKey; //private property

  //has to be named constructor
  //should not return anything
  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey; 
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems =JSON.parse(localStorage.getItem(this.#localStorageKey));
  
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
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
}

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
}

removefromCart(productId) {
  const newCart = [];

  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  this.cartItems = newCart;
  this.saveToStorage();
}

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
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);

