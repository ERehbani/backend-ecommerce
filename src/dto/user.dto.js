class UserDTO {
  constructor(first_name, last_name, role, age, email) {
    this.nombre = first_name;
    this.apellido = last_name;
    this.age = age;
    this.email = email;
    this.role = role;
  }
}

module.exports = UserDTO;
