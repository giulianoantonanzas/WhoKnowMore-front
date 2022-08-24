import { Box, Typography } from "@mui/material";
import RoundedBox from "Components/RoundedBox";
import useGame from "Contexts/GameContext";
import usestyles from "./useStyles";

const PrepareQuestions = () => {
  const styles = usestyles();
  const { playerCreator, playerInvited } = useGame();

  return (
    <Box className={styles.content}>
      <RoundedBox className={styles.suggestedQuestions}>
        <Typography>Preguntas sugeridas</Typography>
      </RoundedBox>
      <RoundedBox className={styles.myQuestions}>
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Typography>Preguntas en juego</Typography>
          <Typography>Respuestas</Typography>
        </Box>
        <Box className={styles.createdQuestions}>{"data..."}</Box>
        <Box className={styles.playersStatus}>
          <Box>
            <Typography>{playerCreator.name}</Typography>
            <Typography>{playerInvited.name}</Typography>
          </Box>
        </Box>
      </RoundedBox>
    </Box>
  );
};

export default PrepareQuestions;
