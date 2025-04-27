 //Named export
 import {cart , removefromCart , updateDeliveryOption} from '../../data/cart.js';
 import { products} from '../../data/products.js';
 import { formatCurrency } from '../utils/money.js';
 import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; //default export
 import {deliveryOptions} from '../../data/deliveryOptions.js';

 const today = dayjs();
 const deliveryDate = today.add(7 , 'days');
 deliveryDate.format('dddd, MMMM D');

  export function renderOrderSummary(){

 let cartSummaryHTML = ' ';

 cart.forEach ((cartItem) =>{

  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) =>{
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
       if (option.id === deliveryOptionId){
         deliveryOption = option;
       }
  });
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays , 
    'days'
  );
  const dateString = deliveryDate.format(
    'dddd , MMMM D'
  );

  cartSummaryHTML +=
    `
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id='${matchingProduct.id}'>
              Update
            </span>
            <input class = "quantity-input">
            <span class = "save-quantity-link  link-primary">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link " data-product-id='${matchingProduct.id}'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML (matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    ` ; 
 });

 function deliveryOptionsHTML (matchingProduct, cartItem) {
     let html = ' ';

     deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays , 
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd , MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

     html += `
      <div class="delivery-option  js-delivery-option" data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked': ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                 ${priceString} Shipping
              </div>
            </div>
          </div>
      `
     });
     return html;
 }

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

updateCheckoutHeaderQuantity();

document.querySelectorAll('.js-delete-link').forEach((link) =>{
    link.addEventListener('click',() =>{
     const productId =  link.dataset.productId;
     removefromCart(productId);

    const container =  document.querySelector(
      `.js-cart-item-container-${productId}`);
      container.remove();
      updateCheckoutHeaderQuantity();
    });
});

function updateCheckoutHeaderQuantity () {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout(${cartQuantity})`;
}

document.querySelectorAll('.js-update-link').forEach((link) => {
   link.addEventListener('click', () =>{
     const productId = link.dataset.productId;
     const container = document.querySelector(`.js-cart-item-container-${productId}`);
     container.querySelector('.quantity-input').style.display = 'inline-block';
     container.querySelector('.save-quantity-link').style.display ='inline-block';
     container.querySelector('.quantity-label').style.display = 'none';
   });
});

document.querySelectorAll('.save-quantity-link').forEach((saveButton) => {
   saveButton.addEventListener('click', () => {
     const container = saveButton.closest('.cart-item-container');
     const productId = container.querySelector('.js-delete-link').dataset.productId;
     const input = container.querySelector('.quantity-input');
     const newQuantity = Number(input.value);

     if(newQuantity > 0){
      const cartItem = cart.find(item => item.productId === productId);
      cartItem.quantity = newQuantity;
      container.querySelector('.quantity-label').innerHTML = newQuantity;
      input.style.display = 'none';
      saveButton.style.display = 'none';
      container.querySelector('.quantity-label').style.display = 'inline-block';
      container.querySelector('.js-update-link').style.display = 'inline-block';
      updateCheckoutHeaderQuantity();
     }
   });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click' , () => {
        const {productId , deliveryOptionId} = element.dataset
        updateDeliveryOption(productId , deliveryOptionId);
        renderOrderSummary(); //recursion
    });
});
}



//1)Update the data
//2)Regenarate all the HTML 
//This twchnique is called MVC (Model-View-Controller)
//Split our code into 3 parts
//a) Model = saves and manages the data
//b) View = takes the data and displays it on the page
// c) Controller = runs some code when we interact with the page