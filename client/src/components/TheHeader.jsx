import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export default function Header() {
  const { logout } = useLogout();

  const handleClick = () => {
    logout()
  }

  return (
    <div className="w-full py-8 bg-white rounded shadow-md">
      <div className="container">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold text-sky-500">
            <Link to={"/"}>Dentist App</Link>
          </h1>
          <nav>
            <div className="space-x-4">
              <Link className="link-button" to={"/login"}>
                Login
              </Link>
              <Link className="link-button" to={"/sign-up"}>
                Register
              </Link>
            </div>
            <button
              onClick={handleClick}
              className="logout-button"
              type="button"
            >
              Log out
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
