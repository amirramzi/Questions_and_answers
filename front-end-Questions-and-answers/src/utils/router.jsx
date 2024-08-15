import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../pages/App";
import Login from "../pages/Login";
import QuestionsMange from "../pages/Admin/QuestionsMange";
import AnswersMange from "../pages/Admin/AnswersMange";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/questions" element={<QuestionsMange />} />
      <Route path="/answers" element={<AnswersMange />} />
    </>
  )
);

export default router;
