const jwt = require("jsonwebtoken");
const { userModel } = require("../modules/auth/user.model");
require("dotenv").config();
const checkAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;

    if (!token) {
      throw {
        status: 404,
        message: "Login to your account",
      };
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (typeof data === "object" && "id" in data) {
      const user = await userModel
        .findById(data.id, {
          __v: 0,
          updatedAt: 0,
        })
        .lean();
      if (!user) {
        throw {
          status: 404,
          message: "User not found, login to your account",
        };
      }

      req.user = user;
      return next();
    }

    throw {
      status: 404,
      message: "Token is invalid",
    };
  } catch (error) {
    next(error);
  }
};

module.exports = { checkAuth };
