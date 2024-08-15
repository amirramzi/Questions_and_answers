import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PlusIcon } from "@heroicons/react/24/solid";
import MyButton from "./ui/MyButton";
import MyDialog from "./ui/MyDialog";
import MyInput from "./ui/MyInput";
import FormLayout from "./layouts/FormLayout";
import callApi from "../utils/callApi";
import MyToast from "../utils/myToast";

const CreateQuestion = ({
  isOpen,
  setIsOpen,
  ques,
  first,
  second,
  third,
  id,
  mutate,
}) => {
  const [question, setQuestion] = useState(ques);
  const [firstAnswer, setFirstAnswer] = useState(first);
  const [secondAnswer, setSecondAnswer] = useState(second);
  const [thirdAnswer, setThirdAnswer] = useState(third);
  const [itemId, setItemId] = useState(id);
  useEffect(() => {
    setQuestion(ques);
    setFirstAnswer(first);
    setSecondAnswer(second);
    setThirdAnswer(third);
    setItemId(id);
  }, [ques, first, second, third, id]);

  const clickHandler = () => {
    setIsOpen(true);
    setQuestion("");
    setFirstAnswer("");
    setSecondAnswer("");
    setThirdAnswer("");
    setItemId(null);
  };

  const submitHandler = async () => {
    if (
      question.trim() !== "" &&
      firstAnswer.trim() !== "" &&
      secondAnswer.trim() !== ""
    ) {
      try {
        let answers = [firstAnswer, secondAnswer, thirdAnswer];
        let data = {
          question,
          answers,
        };
        let result;
        if (itemId) {
          result = await callApi().put(`/question/${itemId}`, data);
        } else {
          result = await callApi().post("/question", data);
        }

        if (result.status === 200) {
          mutate();
          MyToast(result.data.message);
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <MyButton
        onClick={clickHandler}
        btnIcon={<PlusIcon className="h-6 w-6 text-white pr-2" />}
      >
        ایجاد سوال جدید
      </MyButton>
      <MyDialog
        open={isOpen}
        close={() => setIsOpen(false)}
        btn={false}
        title={id ? "ویرایش سوال" : "ساخت سوال جدید"}
      >
        <FormLayout btnText="تایید" submitHandler={submitHandler}>
          <MyInput
            label="سوال"
            value={question}
            onChangeHandler={(e) => setQuestion(e.target.value)}
            type="string"
          />
          <MyInput
            label="پاسخ اول"
            value={firstAnswer}
            onChangeHandler={(e) => setFirstAnswer(e.target.value)}
            type="string"
          />
          <MyInput
            label="پاسخ دوم"
            value={secondAnswer}
            onChangeHandler={(e) => setSecondAnswer(e.target.value)}
            type="string"
          />
          <MyInput
            label="پاسخ سوم"
            value={thirdAnswer}
            onChangeHandler={(e) => setThirdAnswer(e.target.value)}
            type="string"
          />
        </FormLayout>
      </MyDialog>
    </>
  );
};

CreateQuestion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  ques: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  second: PropTypes.string.isRequired,
  third: PropTypes.string.isRequired,
  mutate: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default CreateQuestion;
