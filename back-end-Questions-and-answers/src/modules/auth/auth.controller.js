const { userModel } = require("./user.model");
const {
  hashPassword,
  comparePassword,
  signToken,
} = require("../../utils/auth.handler");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else if (comparePassword(password, user.password)) {
      const token = signToken({ id: user.id, email: user.email });

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .status(200)
        .json({
          message: "Login is Successfully",
        });
    } else {
      return res
        .status(400)
        .json({ message: "email or password is incorrect" });
    }
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.create({
      email,
      password: hashPassword(password),
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
};
const userAuth = async (req, res, next) => {
  try {
    const user = req.user;
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  userAuth,
};
