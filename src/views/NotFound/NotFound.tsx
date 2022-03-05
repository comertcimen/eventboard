import { Navigate } from "react-router-dom";
import { State } from "src/store/accountReducer";
import { useSelector } from "react-redux";

export const NotFound = () => {
  const account = useSelector((state: State) => state.account);
  const { isLoggedIn } = account;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Navigate to="/dashboard" />;
};
