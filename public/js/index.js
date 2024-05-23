const socket = io();

socket.on("products", (data) => {
  //console.log(data);
  renderProductos(data);
});

//Función para renderizar nuestros productos:

const renderProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  // biome-ignore lint/complexity/noForEach: <explanation>
  productos.docs.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = ` 
    <div class="product">
    <p class="product-title"> ${item.title} </p>
    <p> $${item.price} </p>
    <button class="button-login"> Eliminar </button>
    </div>
                        `;

    contenedorProductos.appendChild(card);
    //Agregamos el evento al boton de eliminar:
    card.querySelector("button").addEventListener("click", () => {
      eliminarProducto(item._id);
    });
  });
};

const eliminarProducto = (id) => {
  socket.emit("deleteProducts", id);
};

//Agregamos productos del formulario:

document.getElementById("btnEnviar").addEventListener("click", () => {
  agregarProducto();
});

const agregarProducto = () => {
  const producto = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    img: document.getElementById("img").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true",
  };

  socket.emit("addProduct", producto);
};
