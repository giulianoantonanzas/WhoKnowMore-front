import { makeStyles } from "@material-ui/styles";
import { theme } from "Contexts/MaterialUITheme/MainThemeUI";
import variables from "Contexts/MaterialUITheme/variables";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem",
    gap: "1rem",
    rowGap: "1rem",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  suggestedQuestions: {
    width: "100%",
    height: "67vh",
    margin: "1rem 0",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      minHeight: "20vh",
      width: "unset",
      height: "unset",
    },
  },
  myQuestions: {
    minWidth: "58%",
    height: "67vh",
    margin: "1rem 0",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "unset",
      height: "unset",
    },
  },
  createdQuestions: {
    height: "100%",
    padding: "0",
    minHeight: "20vh",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  playersStatus: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
    alignItems: "self-end",
    position: "relative",
    "&>div": {
      padding: "1rem",
      transform: "translateX(2.4rem) translateY(2.5rem)",
      [theme.breakpoints.down("sm")]: {
        transform: "translateX(1rem) translateY(1rem)",
      },
      borderRadius: "8px",
      color: variables.white,
      background: "#5A2D2D",
      position: "absolute",
    },
  },
}));

export default useStyles;
