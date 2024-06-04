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
      await requester.delete(`/api/users/${newUser.email}`)
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

      expect(statusCode).to.eql(302)

      await requester.delete(`/api/products/test/${newProduct.code}`)

    });
  });
});
