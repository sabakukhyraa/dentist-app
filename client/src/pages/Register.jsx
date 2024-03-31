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
    <form className="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password-again">Password Again:</label>
        <input
          type="password"
          name="password-again"
          id="password-again"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
