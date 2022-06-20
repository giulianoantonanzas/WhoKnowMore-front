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
    minWidth: 300,
    minHeight: 170,
    background: variables.defaultBackground,
    padding: "2.4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  buttonBox: {
    marginTop: "2rem",
    display: "flex",
    width: "100%",
    gap: "1rem",
    flexDirection: "column",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    filter: `drop-shadow(0 0px 4px ${variables.primary})`,
    padding: "2rem",
    minWidth: 300,
    minHeight: 200,
    borderRadius: "12px",
    background: variables.defaultBackground,
    "& h4": {
      textAlign: "center",
    },
  },
}));

export default useStyles;
