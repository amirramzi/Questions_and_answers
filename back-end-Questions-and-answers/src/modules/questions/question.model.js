const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    answers: { type: [String], required: true },
  },
  { timestamps: true }
);

const QuestionModel = model("question", QuestionSchema);

module.exports = QuestionModel;
