const { faker } = require("@faker-js/faker");

// Función para generar un solo producto
const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    img: faker.image.url(),
    code: parseInt(faker.string.uuid()),
    stock: parseInt(faker.string.uuid()),
    category: faker.commerce.department(),
    status: faker.datatype.boolean(),
    thumbnails: [
      faker.image.imageUrl(),
      faker.image.imageUrl(),
      faker.image.imageUrl()
    ],
  };
};

// Función para generar múltiples productos
const generateProducts = (count = 100) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateProduct());
  }
  return products;
};

module.exports = generateProducts;
