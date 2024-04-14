import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function PatientRegister({ setIsModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const { signUpPatient, isLoading, error, setError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    password !== passwordAgain
      ? setError("Passwords do not match.")
      : await signUpPatient(email, password);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form className="auth-forms" onSubmit={handleSubmit} noValidate>
        <button className="self-end" type="button" onClick={() => setIsModalOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 50 50"
          >
            <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
          </svg>
        </button>
        <h2 className="mb-6 text-3xl font-bold text-sky-500">
          Register this Patient
        </h2>
        <p className="mb-6 text-xs">
          Create login information for the patient to read their own information
        </p>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Patient E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Patient Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password-again"
            id="password-again"
            placeholder="Password Again"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          className="self-end !px-6 link-button disabled:opacity-30"
          type="submit"
        >
          {isLoading ? "Loading" : "Register the Patient"}
        </button>
        {error && (
          <div>
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
