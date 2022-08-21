import { PlayerContextProvider } from "Contexts/PlayerContext";
import RootNavigator from "Navigate";
import { MainThemeUI } from "./Contexts/MaterialUITheme/MainThemeUI";

const App = () => {
  return (
    <MainThemeUI>
      <PlayerContextProvider>
        <RootNavigator />
      </PlayerContextProvider>
    </MainThemeUI>
  );
};

export default App;
