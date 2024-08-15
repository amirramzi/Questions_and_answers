const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET_KEY;

const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

const comparePassword = (password, hashed) => {
  return compareSync(password, hashed);
};

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken,
};
