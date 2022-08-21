import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import variables from "./variables";

export const theme = createTheme({
  palette: {
    primary: {
      main: variables.primary,
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: "rgb(0 0 0/20%) !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "none !important",
          overflowY: "unset !important" as "unset",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontFamily: "Inter",
          fontStyle: "normal",
          color: variables.lightDark,
          fontWeight: 700,
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& legend": {
            width: "0",
          },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        formControl: {
          position: "relative",
        },
        root: {
          transform: "unset !important",
          padding: "0 0.2rem",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          gap: "4px",
        },
      },
    },
  },
});

export const MainThemeUI: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
