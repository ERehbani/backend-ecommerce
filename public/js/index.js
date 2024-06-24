const socket = io();

socket.on("products", (data) => {
  renderProductos(data);
});

//Función para renderizar nuestros productos:

const renderProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";

  productos.docs.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Agregar una clase adicional si el producto pertenece a un usuario premium
    if (user.isPremium && item.owner === user.email) {
      card.classList.add("product-premium");
    }
    card.innerHTML = ` 
    <div class="product">
      <p class="product-title">${item.title}</p>
      <p>$${item.price}</p>
      <button class="button-login">Eliminar</button>
    </div>
    `;
    contenedorProductos.appendChild(card);

    card.querySelector("button").addEventListener("click", async () => {
      if (user.isPremium && item.owner === user.email) {
        eliminarProducto(item._id, item.owner, item.title);
      } else if (user.isAdmin) {
        eliminarProducto(item._id, item.owner, item.title);
      } else {
        alert("Error, No tienes permiso para borrar ese producto");
      }
    });
  });
};

const eliminarProducto = (id, email, title) => {
  socket.emit("deleteProducts", id, email, title);
  console.log(id, "VETGA");
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
    owner: document.getElementById("owner").value,
  };

  socket.emit("addProduct", producto);
};
