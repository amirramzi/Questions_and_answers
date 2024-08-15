const { Router } = require("express");
const { AnswerRouter } = require("./src/modules/answers/answers.routes");
const { AuthRouter } = require("./src/modules/auth/auth.routes");
const { QuestionRouter } = require("./src/modules/questions/question.routes");

const mainRouter = Router();

mainRouter.use("/question", QuestionRouter);
mainRouter.use("/answer", AnswerRouter);
mainRouter.use("/auth", AuthRouter);

module.exports = mainRouter;
