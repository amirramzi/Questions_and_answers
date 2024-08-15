import { useEffect, useState } from "react";
import useSWR from "swr";
import FormQuestion from "../components/FormQuestion";
import Question from "../components/Question";
import EndQuestion from "../components/EndQuestion";
import callApi from "../utils/callApi";
import Bg from "../components/layouts/Bg";
import MyLoadingMessage from "../components/ui/MyLoadingMessage";
import MyErrorMessage from "../components/ui/MyErrorMessage";

const fetcher = (url) =>
  callApi()
    .get(url)
    .then((res) => res.data);

function App() {
  const [questionsData, setQuestionsData] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [endMessage, setEndMessage] = useState("");

  const { data, error, isLoading } = useSWR("/question/all", fetcher);

  useEffect(() => {
    if (data) {
      setQuestionsData(data.questions);
    }
  }, [data]);

  const handleNextQuestion = (answer) => {
    if (currentQuestionIndex !== null) {
      const currentQuestion = questionsData[currentQuestionIndex]?.question;
      const updatedAnswers = [
        ...answers,
        { question: currentQuestion, answer },
      ];

      setAnswers(updatedAnswers);

      if (currentQuestionIndex < questionsData?.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        submitData(updatedAnswers);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      setCurrentQuestionIndex(null);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitData = async (updatedAnswers) => {
    try {
      const result = await callApi().post("/answer", {
        userInformation: { name, age, gender },
        answers: JSON.stringify(updatedAnswers),
      });
      if (result.status === 200) {
        setEndMessage(result.data.message);
        setQuizCompleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startQuiz = () => {
    if (name.trim() !== "" && age.trim() !== "" && gender.trim() !== "") {
      setCurrentQuestionIndex(0);
    } else {
      setErrorMessage("لطفا مشخصات خود را وارد کنید");
    }
  };

  if (isLoading) {
    return (
      <Bg>
        <MyLoadingMessage />
      </Bg>
    );
  }

  if (error) {
    return (
      <Bg>
        <MyErrorMessage />
      </Bg>
    );
  }

  return (
    <Bg>
      {currentQuestionIndex === null ? (
        <FormQuestion
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          gender={gender}
          setGender={setGender}
          errorMessage={errorMessage}
          startQuiz={startQuiz}
        />
      ) : quizCompleted ? (
        <EndQuestion name={name} endMessage={endMessage} />
      ) : questionsData && questionsData[currentQuestionIndex] ? (
        <Question
          question={questionsData[currentQuestionIndex]?.question || ""}
          answers={questionsData[currentQuestionIndex]?.answers || []}
          onNextQuestion={handleNextQuestion}
          onPreviousQuestion={handlePreviousQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questionsData?.length}
        />
      ) : (
        <MyErrorMessage />
      )}
    </Bg>
  );
}

export default App;
