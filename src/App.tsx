import { CustomRoutes } from "src/routes";
import { SnackbarProvider } from "notistack";
import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <MantineProvider>
      <SnackbarProvider maxSnack={3}>
        <CustomRoutes />
      </SnackbarProvider>
    </MantineProvider>
  );
};

export default App;
