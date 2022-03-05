import { Route, Routes } from "react-router-dom";
import { HomePage, NotFound, Dashboard, Calendar, PastEvents } from "src/views";
import { AppWrapper } from "src/components";
import { RequireAuth } from "src/utils";

export const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/" element={<RequireAuth />}>
        <Route
          path="/dashboard"
          element={
            <AppWrapper>
              <Dashboard />
            </AppWrapper>
          }
        />

        <Route
          path="/calendar"
          element={
            <AppWrapper>
              <Calendar />
            </AppWrapper>
          }
        />

        <Route
          path="/pastevents"
          element={
            <AppWrapper>
              <PastEvents />
            </AppWrapper>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
