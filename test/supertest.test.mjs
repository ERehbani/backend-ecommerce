import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Testing del Ecommerce para Coderhouse", () => {
  describe("Testing de usuarios", () => {
    it("Endpoint POST /api/sessions que debe crear un nuevo usuario", async () => {
      const newUser = {
        first_name: "coder",
        last_name: "coder",
        email: "coder@gmail.com",
        password: "1234",
        age: 31,
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/sessions")
        .send(newUser);

      expect(statusCode).to.eql(302);
      await requester.delete(`/api/users/${newUser.email}`);
    });

    it("Endpoint /sessionLogin para loguear un usuario", async () => {
      const userLogin = {
        email: "day6@gmail.com",
        password: "1234",
      };

      const { statusCode } = await requester
        .post("/api/sessionLogin")
        .send(userLogin);

      expect(statusCode).to.eql(302);
    });
  });

  describe("Testing de productos", () => {
    it("Creacion de un producto", async () => {
      const newProduct = {
        title: "timetime",
        description: "timetime",
        price: 299,
        code: "012111",
        stock: 20,
        category: "Testing",
        thumbnails: ["sí"],
      };

      const { statusCode } = await requester
        .post("/api/products")
        .send(newProduct);

      expect(statusCode).to.eql(302);

      await requester.delete(`/api/products/test/${newProduct.code}`);
    });
  });

  describe("Testing de carrito", () => {
    it("Traer carrito por id", async () => {
      const { statusCode } = await requester.get(
        "/api/carts/665b58709a182b69933a6229"
      );
      expect(statusCode).to.eql(200);
    });

    it("Añadir producto al carrito", async () => {
      const { statusCode } = await requester.post(
        "/api/carts/65da6815d2d4c74650b4d13b/product/65c16244a34c623a26501f65"
      );

      expect(statusCode).to.eql(200);

      await requester.delete(
        "/api/carts/65da6815d2d4c74650b4d13b/product/65c16244a34c623a26501f65"
      );
    });

    it("Eliminar producto del carrito", async () => {
      await requester.post(
        "/api/carts/665b58709a182b69933a6229/product/6654aace1b342a10838e17f5"
      );
      const { statusCode } = await requester.delete(
        "/api/carts/665b58709a182b69933a6229/product/6654aace1b342a10838e17f5"
      );

      expect(statusCode).to.eql(200);
    });
  });

  describe("Testing de ticket", () => {
    it("Crear ticket", async () => {
      await requester.post(
        "/api/carts/665b58709a182b69933a6229/product/6654aace1b342a10838e17f5"
      );
      const { statusCode } = await requester.post("/api/665b58709a182b69933a6229/purchase")

      expect(statusCode).to.eql(200)
    })
  })
});
