import {addToCart , cart  , loadFromStorage} from '../../data/cart.js'

//Best practice in testing is to test each condition of an if-statement and maximize the test coverage
describe('test suite: addToCart', () => {
  it ('adds an existing product to the cart' , () => {
    spyOn(localStorage , 'setItem');

    spyOn(localStorage , 'getItem').and.callFake(() =>{
      return JSON.stringify([{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId : '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });

  it ('adds a new product to the cart' , () => {
    spyOn(localStorage , 'setItem');
     
    spyOn(localStorage , 'getItem').and.callFake(() =>{
      return JSON.stringify([]);
    });//helps to create a mock of getItem , we can do for anything even records the method
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });
});
//Flakey test = test that sometimes passes and sometimes fails
//Mocks = lets us replace a method with a fake version
