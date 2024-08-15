const autoBind = require("auto-bind");
const AnswersModel = require("./answers.model");

class AnswerController {
  #model;
  constructor() {
    autoBind(this);
    this.#model = AnswersModel;
  }

  async CreateAnswer(req, res, next) {
    try {
      const { userInformation, answers } = req.body;
      await this.#model.create({ userInformation, answers });
      res.send({ status: 200, message: "نظر سنجی با موفقیت ثبت شد" });
    } catch (error) {
      next(error);
    }
  }
  async FindAnswers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;

      const answers = await this.#model
        .find({}, { __v: 0, updatedAt: 0 })
        .skip(skip)
        .limit(limit);

   
      const totalAnswers = await this.#model.countDocuments({});

     
      const totalGenders = await this.#model.aggregate([
        {
          $group: {
            _id: "$userInformation.gender",
            count: { $sum: 1 },
          },
        },
      ]);

     
      const genderCounts = {
        male: totalGenders.find((g) => g._id === "آقا")?.count || 0,
        female: totalGenders.find((g) => g._id === "خانم")?.count || 0,
      };

      res.json({
        data: answers,
        currentPage: page,
        totalPages: Math.ceil(totalAnswers / limit),
        totalItems: totalAnswers,
        totalGenders: genderCounts,
      });
    } catch (error) {
      next(error);
    }
  }
  async DeleteAnswer(req, res, next) {
    try {
      const { id } = req.params;
      await this.#model.deleteOne({ _id: id });
      res.send({ status: 200, message: "نظر سنجی مورد نظر با موفقیت پاک شد" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AnswerController();
