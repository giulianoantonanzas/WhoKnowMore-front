import { makeStyles } from "@material-ui/styles";
import { theme } from "Contexts/MaterialUITheme/MainThemeUI";

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
    "& input": {
      padding: "8px",
    },
  },
  suggestedQuestions: {
    width: "100%",
    height: "67vh",
    margin: "1rem 0",
    minHeight: "35vh",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",

      width: "unset",
      height: "unset",
    },
  },
  myQuestions: {
    minWidth: "58%",
    height: "67vh",
    margin: "1rem 0",
    minHeight: "35vh",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "unset",
      height: "unset",
    },
    "&>div": {
      gap: "1rem",
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        minHeight: "35vh",
      },
    },
  },
  createdQuestions: {
    margin: "1rem 0",
    padding: "0",
    gap: "1rem",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "&>div": {
      display: "flex",
      gap: "1rem",
      justifyContent: "space-between",
    },
  },
  playersStatus: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
    alignItems: "self-end",
    position: "relative",
    "&>div": {
      minHeight: "60px",
      minWidth: "300px",
      padding: "1rem",
      transform: "translateX(2.4rem) translateY(2.5rem)",
      [theme.breakpoints.down("sm")]: {
        transform: "translateX(1rem) translateY(1rem)",
      },
      borderRadius: "8px",
      color: theme.palette.primary.main,
      border: `solid 1px ${theme.palette.primary.main}`,
      position: "absolute",
    },
  },
}));

export default useStyles;
