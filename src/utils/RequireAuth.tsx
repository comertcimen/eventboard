import { Navigate, useLocation } from "react-router-dom";
import { ChrildrenProps } from "src/utils";
import { State } from "src/store/accountReducer";
import { useSelector } from "react-redux";
import { ReactElement } from "react";

export const RequireAuth = ({ children }: ChrildrenProps) => {
  const account = useSelector((state: State) => state.account);
  const { isLoggedIn } = account;
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children as ReactElement;
};
