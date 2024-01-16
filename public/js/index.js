console.log("siuuu");

const socket = io();
socket.emit("mensaje", "oskdoskodsk");

socket.on("addProduct", (product) => {
  console.log(product);
});

socket.on("products", (products) => {
  let log = document.getElementById("realTimeProducts");
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML = productsHTML + `<li>${product.title}</li>`;
  });

  log.innerHTML = `<ul>${productsHTML}</ul>`;
});

// socket.on("updateProducts", (data) => {
//   socket.emit("message", { message: data });
//   let log = document.getElementById("realTimeProducts");
//   let products = "";

//   data.forEach((product) => {
//     products = products + `<li>${product.title}</li>`;
//   });

//   log.innerHTML = `<ul>${products}</ul>`;
// });
