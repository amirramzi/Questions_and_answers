const { Router } = require("express");
const { login, register, userAuth } = require("./auth.controller");
const { checkAuth } = require("../../middleware/check-auth");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user", checkAuth, userAuth);
module.exports = {
  AuthRouter: router,
};
