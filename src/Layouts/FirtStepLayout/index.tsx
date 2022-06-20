import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import useStyles from "./useStyles";
import Logo from "Assets/Images/logoWKM.svg";

const FirtStepLayout = () => {
  const { root } = useStyles();
  return (
    <Box className={root}>
      <img src={Logo} />
      <Outlet />
    </Box>
  );
};

export default FirtStepLayout;
