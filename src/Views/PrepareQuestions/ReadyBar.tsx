import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useGame from "Contexts/GameContext";
import variables from "Contexts/MaterialUITheme/variables";
import { FC } from "react";
import useStyles from "./useStyles";

type ReadyBarProps = {
  creatorIsReady: boolean;
  invitedIsReady: boolean;
  handleSetReady: () => void;
};

const ReadyBar: FC<ReadyBarProps> = ({
  creatorIsReady,
  invitedIsReady,
  handleSetReady,
}) => {
  const { playerInvited, playerCreator } = useGame();
  const styles = useStyles();

  return (
    <Box className={styles.playersStatus}>
      <Box>
        <Box
          bgcolor={creatorIsReady ? variables.success : ""}
          display={"flex"}
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>{playerCreator.name}</Typography>
          {playerCreator.selected ? (
            <Button
              color="success"
              variant="contained"
              disabled={creatorIsReady}
              onClick={handleSetReady}
            >
              {creatorIsReady && invitedIsReady
                ? "Listo"
                : creatorIsReady
                ? "Esperando..."
                : "Estoy listo"}
            </Button>
          ) : (
            <Typography>
              {creatorIsReady ? "Esta listo" : "Cargando preguntas..."}
            </Typography>
          )}
        </Box>
        <Box
          bgcolor={invitedIsReady ? variables.success : ""}
          display={"flex"}
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography>{playerInvited.name}</Typography>
          {playerInvited.selected ? (
            <Button
              color="success"
              variant="contained"
              disabled={invitedIsReady}
              onClick={handleSetReady}
            >
              {invitedIsReady && creatorIsReady
                ? "Listo"
                : invitedIsReady
                ? "Esperando..."
                : "Estoy Listo"}
            </Button>
          ) : (
            <Typography>
              {invitedIsReady ? "Esta listo" : "Cargando preguntas..."}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReadyBar;
