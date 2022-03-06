import { CustomRoutes } from "src/routes";
import { SnackbarProvider } from "notistack";
import { MantineProvider } from "@mantine/core";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "src/utils";
import { useDispatch } from "react-redux";
import { LOGOUT } from "src/store/actions";

const App = () => {
  const dispatcher = useDispatch();
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      await dispatcher({
        type: LOGOUT,
        payload: {
          isLoggedIn: false,
          user: "",
          token: "",
        },
      });
    }
  });
  return (
    <MantineProvider>
      <SnackbarProvider maxSnack={3}>
        <CustomRoutes />
      </SnackbarProvider>
    </MantineProvider>
  );
};

export default App;
