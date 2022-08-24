import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import useStyles from "./useStyles";
import Logo from "Assets/Images/logoWKM.svg";
import { Slide } from "@mui/material";

const FirtStepLayout = () => {
  const { root } = useStyles();

  return (
    <Box className={root}>
      <Slide direction="down" timeout={1000} in={true}>
        <img src={Logo} />
      </Slide>
      <Slide direction="up" timeout={1000} in={true}>
        <div>
          <Outlet />
        </div>
      </Slide>
    </Box>
  );
};

export default FirtStepLayout;
