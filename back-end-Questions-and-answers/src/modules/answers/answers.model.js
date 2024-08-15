const { Schema, model } = require("mongoose");

const AnswersSchema = new Schema(
  {
    userInformation: { type: Object, required: true },
    answers: { type: Array, required: true },
  },
  { timestamps: true }
);

const AnswersModel = model("answer", AnswersSchema);

module.exports = AnswersModel;
