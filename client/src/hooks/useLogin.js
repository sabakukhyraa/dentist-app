import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginReducer } from "../redux/reducers/authReducer.js";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // saving the user token to localStorage
      localStorage.setItem("user", JSON.stringify(json));

      // update the user reducer
      dispatch(loginReducer(json));

      setIsLoading(false);
    }
  };

  return { login, isLoading, error, setError };
};