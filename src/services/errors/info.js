const generateErrorUser = (usuario) => {
  return ` Los datos estan incompletos o no son válidos. 
    Necesitamos recibir los siguientes datos: 
    - first_name: String, recibimos ${usuario.first_name}
    - last_name: String, recibimos ${usuario.last_name}
    - email: String, recibimos ${usuario.email}
    - password: String, recibimos ${usuario.password}
    - age: Number, recibimos ${usuario.age}
    `;
};

const generateErrorAddProduct = (product) => {
  return `Hubo un error con el producto: ${product}`;
};

const generateErrorGetProduct = (product) => {
  return `No se pudo obtener el producto: ${product}`;
};

const generateErrorGetId = (id) => {
  return `No se pudo obtener por id: ${id}`;
};

const generateErrorUpdate = (id, body) => {
  return `No se pudo actualizar el por id: ${id}...
    body: ${body}`;
};

const generateErrorDelete = (id) => {
  return `Error al eliminar por id: ${id}`;
};

const generateErrorNew = () => {
  return `Error al crear en el controlador`;
};

const generateErrorProductToCart = (cid, pid, quantity) => {
  return `Error al agregar un producto al carrito
    Id del carrito: ${cid}
    Id del producto: ${pid}
    Cantidad del producto: ${quantity}`;
};

const generateErrorDeleteProductFromCart = (cid, pid) => {
  return `No se pudo borrar el producto del carrito
    Id del carrito: ${cid}
    Id del producto: ${pid}`;
};

const generateErrorUpdateQuantity = (cid, pid, quantity) => {
  return `Error al modificar la cantidad del producto en el carrito
    Id del carrito: ${cid}
    Id del producto: ${pid}
    Cantidad del producto: ${quantity}`;
};

const generateErrorPurchaseTicket = (cart, cartId, products) => {
    return `Error al realizar una compra
    carrito: ${cart}
    ticket: ${cartId}
    producto: ${products}`
}

const generateErrorLoginGithub = (usuario, login) => {
    return `Error al iniciar sesión con Github
    req.session.usuario: ${usuario}
    req.session.login: ${login}`
}

const generateErrorView = (view) => {
     return `Error al vizualizar la vista: ${view}` 
}

module.exports = {
  generateErrorUser,
  generateErrorAddProduct,
  generateErrorGetProduct,
  generateErrorGetId,
  generateErrorUpdate,
  generateErrorDelete,
  generateErrorNew,
  generateErrorProductToCart,
  generateErrorDeleteProductFromCart,
  generateErrorUpdateQuantity,
  generateErrorPurchaseTicket,
  generateErrorLoginGithub,
  generateErrorView
};
