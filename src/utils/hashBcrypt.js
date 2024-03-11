const bcrypt = require("bcrypt");

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const isValidPassword = (user, password) => {
    console.log(password, user.password)
    return bcrypt.compareSync(password, user.password);
};

module.exports = { createHash, isValidPassword };
