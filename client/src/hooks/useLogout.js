import { useDispatch } from "react-redux";
import { logoutReducer } from "../redux/reducers/authReducer.js";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(logoutReducer());
  }

  return { logout };
}