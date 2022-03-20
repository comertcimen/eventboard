import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  NotFound,
  Dashboard,
  Calendar,
  PastEvents,
  Saved,
  ChatPage,
  UserDetails,
} from "src/views";
import { AppWrapper, RequireAuth } from "src/components";

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

        <Route
          path="/saved"
          element={
            <AppWrapper>
              <Saved />
            </AppWrapper>
          }
        />

        <Route
          path="/chat"
          element={
            <AppWrapper>
              <ChatPage />
            </AppWrapper>
          }
        />

        <Route
          path="/u/:id"
          element={
            <AppWrapper>
              <UserDetails />
            </AppWrapper>
          }
        />

        <Route
          path="/u/:id/events"
          element={
            <AppWrapper>
              <div>User All Events</div>
            </AppWrapper>
          }
        />

        <Route
          path="/u/:id/events/:event_id"
          element={
            <AppWrapper>
              <div>User Single Event</div>
            </AppWrapper>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
