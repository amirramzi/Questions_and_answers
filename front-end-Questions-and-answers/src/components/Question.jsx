import { useState } from "react";
import PropTypes from "prop-types";
import { RadioGroup } from "@headlessui/react";
import {
  CheckCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { toPersianNumber } from "../utils/persianNumber";
import Box from "./layouts/Box";
import IconPlayer from "./IconPlayer";
import ICON from "../assets/wired-outline-45-clock-time.json";
import MyButton from "./ui/MyButton";
import ErrorButton from "./ui/ErrorButton";
function Question({
  question,
  answers,
  onNextQuestion,
  onPreviousQuestion,
  currentQuestionIndex,
  totalQuestions,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      onNextQuestion(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    onPreviousQuestion();
  };

  return (
    <Box>
      <div className="flex justify-center">
        <IconPlayer icon={ICON} timer={20} />
      </div>

      <h2 className="text-lg font-semibold mb-2 text-white">{question}</h2>
      <div className="text-gray-500 mb-6 text-xs">
        سوال {toPersianNumber(currentQuestionIndex + 1)} از
        {toPersianNumber(totalQuestions)}
      </div>
      <RadioGroup value={selectedAnswer} onChange={setSelectedAnswer}>
        <div className="space-y-4">
          {answers.map((answer, index) => (
            <RadioGroup.Option
              key={index}
              value={answer}
              className={({ active, checked }) =>
                `relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none transition-all duration-300 ${
                  checked
                    ? "bg-opacity-60 ring-2 ring-white ring-opacity-75 text-white"
                    : "bg-opacity-10 text-gray-200"
                } ${
                  active || checked
                    ? "bg-white/10 ring-1 ring-white ring-opacity-40 backdrop-blur-md"
                    : "bg-gray-800 bg-opacity-30"
                } before:absolute before:inset-0 before:rounded-lg before:blur-lg before:transition-opacity before:duration-300 ${
                  checked
                    ? "before:opacity-100 before:content-[''] before:bg-gradient-to-r before:from-blue-500 before:via-gray-500 before:to-orange-200"
                    : "before:opacity-0"
                }`
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center justify-between relative z-10">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium ${
                          checked ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {answer}
                      </RadioGroup.Label>
                    </div>
                    {checked && (
                      <CheckCircleIcon className="w-6 h-6 text-white" />
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="flex justify-end gap-4 mt-10">
        <ErrorButton
          onClick={handlePrevious}
          btnIcon={<ChevronDoubleRightIcon className="w-6 h-6 text-white" />}
        >
          قبلی
        </ErrorButton>

        <MyButton
          onClick={handleNext}
          btnIcon={<ChevronDoubleLeftIcon className="w-6 h-6 text-white" />}
        >
          بعدی
        </MyButton>
      </div>
    </Box>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onNextQuestion: PropTypes.func.isRequired,
  onPreviousQuestion: PropTypes.func.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default Question;
