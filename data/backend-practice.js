//http = hypertext transferring protocol
//url = uniform resource locator(an address)

// XMLHttpRequest = built-in class by js 

const xhr = new XMLHttpRequest();//generating an object , this creates a new HTTP message(request) to send to the backend
//load = the response is loading
xhr.addEventListener('load', () =>{
  console.log(xhr.response); 
});//this waits for an event 


// "GET" = get some info from the backend
// in .open() = 1st parameter is type of request and second is the location where we are sending the request
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();//sending a request , asynchronous line

//xhr.response  //first it will be  undefined bcuz request and response take time to travel over internet
