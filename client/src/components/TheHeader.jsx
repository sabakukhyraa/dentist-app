import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";

export default function Header() {
  const { logout } = useLogout();

  const auth = useSelector((state) => state.auth);

  const handleClick = () => {
    logout();
  };

  return (
    <div className="w-full py-8 bg-white rounded shadow-md">
      <div className="container">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold text-sky-500">
            <Link to={"/"}>Dentist App</Link>
          </h1>
          <nav>
            {!auth.user && (
              <div className="space-x-4">
                <Link className="link-button" to={"/login"}>
                  Login
                </Link>
                <Link className="link-button" to={"/sign-up"}>
                  Register
                </Link>
              </div>
            )}
            {auth.user && (
              <div className="space-x-4">
                <span>{auth.user.email}</span>
                <button
                  onClick={handleClick}
                  className="logout-button"
                  type="button"
                >
                  Log out
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
