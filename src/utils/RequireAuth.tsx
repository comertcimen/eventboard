import { Navigate, useLocation, Outlet } from "react-router-dom";
import { State } from "src/store/accountReducer";
import { useSelector } from "react-redux";

export const RequireAuth = () => {
  const account = useSelector((state: State) => state.account);
  const { isLoggedIn } = account;
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
