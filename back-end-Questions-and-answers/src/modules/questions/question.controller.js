const autoBind = require("auto-bind");
const QuestionsModel = require("./question.model");

class QuestionController {
  #model;
  constructor() {
    autoBind(this);
    this.#model = QuestionsModel;
  }

  async CreateQuestion(req, res, next) {
    try {
      const { question, answers } = req.body;

      await this.#model.create({ question, answers });
      res.send({ status: 200, message: "سوال با موفقیت ثبت شد" });
    } catch (error) {
      next(error);
    }
  }
  async FindQuestions(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const questions = await this.#model
        .find({}, { __v: 0, updatedAt: 0 })
        .skip(skip)
        .limit(limit);

      const totalQuestions = await this.#model.countDocuments({});

      res.json({
        data: questions,
        currentPage: page,
        totalPages: Math.ceil(totalQuestions / limit),
        totalItems: totalQuestions,
      });
    } catch (error) {
      next(error);
    }
  }
  async FindAllQuestions(req, res, next) {
    try {
      const questions = await this.#model.find({}, { __v: 0, updatedAt: 0 });

      res.json({
        questions,
      });
    } catch (error) {
      next(error);
    }
  }
  async UpdateQuestion(req, res, next) {
    try {
      const { id } = req.params;
      const { question, answers } = req.body;
      await this.#model.updateOne({ _id: id }, { question, answers });
      res.send({
        status: 200,
        message: "سوال مورد نظر با موفقیت بروزرسانی شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async DeleteQuestion(req, res, next) {
    try {
      const { id } = req.params;

      await this.#model.deleteOne({ _id: id });
      res.send({ status: 200, message: "سوال مورد نظر با موفقیت پاک شد" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuestionController();
