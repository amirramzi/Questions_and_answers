import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/ui/MyInput";
import Bg from "../components/layouts/Bg";
import Box from "../components/layouts/Box";
import FormLayout from "../components/layouts/FormLayout";
import ICON from "../assets/system-regular-8-account.json";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import callApi from "../utils/callApi";
import MyToast from "../utils/MyToast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await callApi().get("/auth/user");
        if (result.status == "200") navigate("/questions");
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [navigate]);

  const loginHandler = async () => {
    try {
      const result = await callApi().post("/auth/login", {
        email,
        password,
      });
      console.log(result);
      if (result.status === 200) {
        navigate("/questions");
      }
    } catch (error) {
      MyToast(error.response.data.message);
    }
  };

  return (
    <Bg>
      <Box>
        <FormLayout
          submitHandler={loginHandler}
          btnText="Login"
          btnIcon={
            <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-white pl-2" />
          }
          headerIcon={ICON}
          dir="ltr"
        >
          <MyInput
            label="Email"
            type="email"
            value={email}
            onChangeHandler={(e) => setEmail(e.target.value)}
          />
          <MyInput
            label="Password"
            type="password"
            value={password}
            onChangeHandler={(e) => setPassword(e.target.value)}
          />
        </FormLayout>
      </Box>
    </Bg>
  );
};

export default Login;
