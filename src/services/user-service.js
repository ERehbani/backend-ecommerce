const UserModel = require("../dao/models/user.model");

class UserService {
  async getUserByEmail(email) {
    try {
      const usuario = await UserModel.findOne({ email: email });
      return usuario;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
