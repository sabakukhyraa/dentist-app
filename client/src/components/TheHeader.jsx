import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full py-8 bg-white rounded shadow-md">
      <div className="container">
        <h1 className="text-3xl font-bold text-sky-500">
          <Link to={"/"}>Dentist App</Link>
        </h1>
      </div>
    </div>
  );
}
