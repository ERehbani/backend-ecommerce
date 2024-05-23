class UserDTO {
  constructor(first_name, last_name, role, age, email, cart) {
    this.nombre = first_name;
    this.apellido = last_name;
    this.age = age;
    this.email = email;
    this.role = role;
    this.cart = cart
  }
}

module.exports = UserDTO;
