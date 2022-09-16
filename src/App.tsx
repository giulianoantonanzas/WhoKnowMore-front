import { SocketContextProvider } from "Contexts/SocketContext";
import RouteManager from "RouteManager";
import { MainThemeUI } from "./Contexts/MaterialUITheme/MainThemeUI";

const App = () => {
  return (
    <MainThemeUI>
      <SocketContextProvider>
        <RouteManager />
      </SocketContextProvider>
    </MainThemeUI>
  );
};

export default App;
