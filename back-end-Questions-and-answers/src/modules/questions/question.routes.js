const { Router } = require("express");
const questionController = require("./question.controller");
const { checkAuth } = require("../../middleware/check-auth");

const router = Router();

router.get("/", questionController.FindQuestions);
router.get("/all", questionController.FindAllQuestions);
router.post("/", checkAuth, questionController.CreateQuestion);
router.put("/:id", checkAuth, questionController.UpdateQuestion);
router.delete("/:id", checkAuth, questionController.DeleteQuestion);

module.exports = {
  QuestionRouter: router,
};
