import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "src/utils";

export const RequireAuth = () => {
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  );

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return data?.unsubscribe;
  }, []);

  if (!session) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
