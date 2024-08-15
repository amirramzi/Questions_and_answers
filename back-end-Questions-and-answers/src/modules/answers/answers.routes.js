const { Router } = require("express");
const answersController = require("./answers.controller");
const { checkAuth } = require("../../middleware/check-auth");

const router = Router();

router.get("/", checkAuth, answersController.FindAnswers);
router.post("/", answersController.CreateAnswer);
router.delete("/:id", checkAuth, answersController.DeleteAnswer);

module.exports = {
  AnswerRouter: router,
};
