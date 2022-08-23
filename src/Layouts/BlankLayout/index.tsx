import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import useStyles from "./useStyles";

const BlankLayout = () => {
  const { root } = useStyles();
  return (
    <Box className={root}>
      <Outlet />
    </Box>
  );
};

export default BlankLayout;
