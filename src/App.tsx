import { CustomRoutes } from "src/routes";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <CustomRoutes />
    </SnackbarProvider>
  );
};

export default App;
