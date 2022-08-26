import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import useStyles from "./useStyles";
import Logo from "Assets/Images/logoWKM.svg";
import { Slide } from "@mui/material";
import useGame from "Contexts/GameContext";

const FirtStepLayout = () => {
  const { root } = useStyles();
  const { isRerouting } = useGame();

  return (
    <Box className={root}>
      <Slide
        mountOnEnter
        unmountOnExit
        direction={"down"}
        timeout={1000}
        in={!isRerouting}
      >
        <img src={Logo} />
      </Slide>
      <Slide
        mountOnEnter
        unmountOnExit
        direction="up"
        timeout={1000}
        in={!isRerouting}
      >
        <div>
          <Outlet />
        </div>
      </Slide>
    </Box>
  );
};

export default FirtStepLayout;
