import { GameContextProvider } from "Contexts/GameContext";
import { SocketContextProvider } from "Contexts/SocketContext";
import RootNavigator from "Navigate";
import { MainThemeUI } from "./Contexts/MaterialUITheme/MainThemeUI";

const App = () => {
  return (
    <MainThemeUI>
      <SocketContextProvider>
        <RootNavigator />
      </SocketContextProvider>
    </MainThemeUI>
  );
};

export default App;
