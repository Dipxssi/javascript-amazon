import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts , loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

//Async await is a shortcut for promises
// async = makes a function return a promise
//async lets us use await , await let's us wait for a promise to finish , before to the next line
async function loadPage() {
    
  try{
    //throw 'error1';

    await loadProductsFetch(); //await let's us write asynchronous code like a normal code, we can only use await , when we're inside an async func

    await new Promise((resolve, reject) => {
      //throw 'error2';
      loadCart(() => {
       // reject('error3')
      resolve('value3');
      });
    });
  } catch (error) {
     console.log('Unexpected error . Please try again later.');
  }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
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
