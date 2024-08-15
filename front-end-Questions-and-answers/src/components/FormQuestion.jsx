import PropTypes from "prop-types";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import Box from "./layouts/Box";
import MyInput from "./ui/MyInput";
import MySelect from "./ui/MySelect";
import ICON from "../assets/wired-outline-35-edit.json";
import FormLayout from "./layouts/FormLayout";

const FormQuestion = ({
  name,
  setName,
  age,
  setAge,
  gender,
  setGender,
  errorMessage,
  startQuiz,
}) => {
  return (
    <Box>
      <FormLayout
        dir="rtl"
        headerIcon={ICON}
        description="لطفا برای شروع نام ، سن و جنسیت خود را وارد کنید"
        btnText="شروع"
        btnIcon={<ChevronDoubleLeftIcon className="w-6 h-6 pr-2 text-white" />}
        submitHandler={startQuiz}
      >
        <MyInput
          label="نام و نام خانوادگی"
          value={name}
          onChangeHandler={(e) => setName(e.target.value)}
        />
        <MyInput
          label="سن"
          type="number"
          value={age}
          onChangeHandler={(e) => setAge(e.target.value)}
        />
        <MySelect
          value={gender}
          onChangeHandler={(e) => {
            setGender(e.target.value);
          }}
        />
        {errorMessage && (
          <div className="text-rose-400 text-sm  pt-2">{errorMessage}</div>
        )}
      </FormLayout>
    </Box>
  );
};

FormQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  age: PropTypes.string.isRequired,
  setAge: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  startQuiz: PropTypes.func.isRequired,
};

export default FormQuestion;
