import { Fade, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useGame from "Contexts/GameContext";
import { Outlet } from "react-router-dom";
import useStyles from "./useStyles";

const GameLyout = () => {
  const styles = useStyles();
  const { roomCode, isRerouting } = useGame();

  return (
    <Box className={styles.root}>
      <Fade timeout={1000} in={!isRerouting}>
        <Box className={styles.content}>
          <Box className={styles.header}>
            <Typography variant="h5">Who knows more</Typography>
            <Typography>Room code: {roomCode ?? ""}</Typography>
          </Box>
          <Outlet />
        </Box>
      </Fade>
    </Box>
  );
};

export default GameLyout;
