import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== passwordAgain) return alert('Passwords do not match')
        
    console.log(email, password)
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form className="auth-forms" onSubmit={handleSubmit}>
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

        <button className="self-end !px-6 link-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
