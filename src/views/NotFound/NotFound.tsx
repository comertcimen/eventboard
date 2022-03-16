import { Navigate } from "react-router-dom";
import { supabase } from "src/utils";

export const NotFound = () => {
  const session = supabase.auth.session();

  if (!session) {
    return <Navigate to="/" />;
  }

  return <Navigate to="/dashboard" />;
};
