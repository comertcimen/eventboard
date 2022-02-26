import { Route, Routes } from "react-router-dom";
import { DashboardPage, HomePage } from "src/views";
import { RequireAuth } from "src/utils";

export const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
