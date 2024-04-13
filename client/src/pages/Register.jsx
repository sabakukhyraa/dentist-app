import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const { signUpDoctor, isLoading, error, setError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    password !== passwordAgain
      ? setError("Passwords do not match.")
      : await signUpDoctor(email, password, fullName);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form className="auth-forms" onSubmit={handleSubmit} noValidate>
        <h2 className="mx-auto mb-6 text-4xl font-bold w-fit text-sky-500">
          Register
        </h2>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
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
          {isLoading ? "Loading" : "Register"}
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
