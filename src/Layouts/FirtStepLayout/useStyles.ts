import { makeStyles } from "@material-ui/styles";
import { theme } from "Contexts/MaterialUITheme/MainThemeUI";
import variables from "Contexts/MaterialUITheme/variables";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    background: variables.blackBackground,
  },
}));

export default useStyles;
