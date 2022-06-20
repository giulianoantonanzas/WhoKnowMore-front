import { PlayerContextProvider } from "Contexts/PlayerContext";
import RootNavigator from "Navigate";
import { MainThemeUI } from "./Contexts/MaterialUITheme/MainThemeUI";
import "Assets/Styles/baseStyle.css";

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
