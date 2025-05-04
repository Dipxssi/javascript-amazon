import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts , loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
 loadProductsFetch(),
new Promise((resolve) => {
  loadCart(() => {
    resolve();
  });
})

]).then((values) =>{
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});

//import '../data/cart-class.js';
//import '../data/backend-practice.js';

//promises =  a better way to handle asynchronous code , let us wait for some code to finish , before going to the next step , it's a class , allows js to do multiple things at the same time
//Promise.all() = lets us run multiple promises at the same time and wait for all of them to finish
//resolve is a func , lets us control when to go to the next step

/*
             //1st group of code
new Promise((resolve) =>{
    loadProducts(() =>{ // a callback func which mean it will run the following code when loadProduct() is finished it runs resolve which instrut it to go for the next step i.e .then() method
        resolve('value1'); 
    });

}).then((value) =>{
    console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

//the two groups of code is running at the same time 

/*
             //2nd group of code
loadProducts(() =>{
  loadCart(() =>{
    renderOrderSummary();
    renderPaymentSummary();
  }); 
});*/
