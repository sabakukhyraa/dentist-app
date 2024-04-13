import { useState } from "react"
import { useLogin } from "../hooks/useLogin";

export default function Login() {

  const { login, isLoading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form className="auth-forms" onSubmit={handleSubmit} noValidate>
        <h2 className="mx-auto mb-6 text-4xl font-bold w-fit text-sky-500">
          Login
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
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          className="self-end !px-6 link-button disabled:opacity-30"
          type="submit"
        >
          {isLoading ? "Loading" : "Login"}
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
