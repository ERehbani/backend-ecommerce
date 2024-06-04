const  mongoose = require("mongoose");
const UserModel = require("../dao/models/user.model");

class UserService {
  async getUserByEmail(email) {
    try {
      const usuario = await UserModel.findOne({ email: email });
      return usuario;
    } catch (error) {
      req.logger.error(error);
    }
  }
  async getAllUsers() {
    try {
      return await UserModel.find()
    } catch (error) {
      console.log(error)
    }
  }

  async getCartsUser(cartId) {
    try {
      const user = await UserModel.findOne({ cart: new mongoose.Types.ObjectId(cartId) });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = UserService;
