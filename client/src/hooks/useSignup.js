import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginReducer } from "../redux/reducers/authReducer.js";

export const useSignup = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signUpDoctor = async (email, password, fullName) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(
      "http://localhost:4000/api/user/signup-doctor",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: fullName }),
      }
    );

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // saving the user token to localStorage
      localStorage.setItem('user', JSON.stringify(json))

      // update the user reducer
      dispatch(loginReducer(json));

      setIsLoading(false)
    }
  }

  const signUpPatient = async (email, password, patient) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(
      "http://localhost:4000/api/user/signup-patient",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, patient }),
      }
    );

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
      return json;
    }
  }

  return { signUpDoctor, signUpPatient, isLoading, error, setError };
}