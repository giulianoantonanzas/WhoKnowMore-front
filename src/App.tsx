import { GameContextProvider } from "Contexts/GameContext";
import { SocketContextProvider } from "Contexts/SocketContext";
import RootNavigator from "Navigate";
import { MainThemeUI } from "./Contexts/MaterialUITheme/MainThemeUI";

const App = () => {
  return (
    <MainThemeUI>
      <GameContextProvider>
        <SocketContextProvider>
          <RootNavigator />
        </SocketContextProvider>
      </GameContextProvider>
    </MainThemeUI>
  );
};

export default App;
