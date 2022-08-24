import { makeStyles } from "@material-ui/styles";
import { theme } from "Contexts/MaterialUITheme/MainThemeUI";
import variables from "Contexts/MaterialUITheme/variables";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    background: variables.defaultBackground,
    padding: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
}));

export default useStyles;
