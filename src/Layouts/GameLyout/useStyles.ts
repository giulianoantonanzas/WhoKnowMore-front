import { makeStyles } from "@material-ui/styles";
import { theme } from "Contexts/MaterialUITheme/MainThemeUI";
import variables from "Contexts/MaterialUITheme/variables";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    background: variables.blackBackground,
  },
  content: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    margin: "1rem",
    color: variables.white,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

export default useStyles;
