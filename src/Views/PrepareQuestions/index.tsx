import { Box, Button, Skeleton, Typography } from "@mui/material";
import RoundedBox from "Components/RoundedBox";
import useGame from "Contexts/GameContext";
import usePreparateQuestions from "./usePreparateQuestions";
import usestyles from "./useStyles";

const PrepareQuestions = () => {
  const styles = usestyles();
  const { playerCreator, playerInvited } = useGame();
  const {
    creatorIsReady,
    invitedIsReady,
    handleSetReady,
    loadingSuggeredQuestions,
    suggeredQuestions,
  } = usePreparateQuestions();

  return (
    <Box className={styles.content}>
      <RoundedBox className={styles.suggestedQuestions}>
        <Typography>Preguntas sugeridas</Typography>
        {loadingSuggeredQuestions && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"90%"}
            my={2}
            gap={"1rem"}
          >
            <Skeleton width={"100%"} height={"1rem"} />
            <Skeleton width={"100%"} height={"1rem"} />
            <Skeleton width={"100%"} height={"1rem"} />
            <Skeleton width={"100%"} height={"1rem"} />
            <Skeleton width={"100%"} height={"1rem"} />
            <Skeleton width={"100%"} height={"1rem"} />
            <Skeleton width={"100%"} height={"1rem"} />
            <Skeleton width={"100%"} height={"1rem"} />
          </Box>
        )}
        {suggeredQuestions?.map((question, index) => {
          return <Typography key={index}>{question}</Typography>;
        })}
      </RoundedBox>
      <RoundedBox className={styles.myQuestions}>
        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Typography>Preguntas en juego</Typography>
          <Typography>Respuestas</Typography>
        </Box>
        <Box className={styles.createdQuestions}>{"data..."}</Box>
        <Box className={styles.playersStatus}>
          <Box>
            <Box bgcolor={creatorIsReady ? "green" : "unset"} display={"flex"}>
              <Typography>{playerCreator.name}</Typography>
              {playerCreator.selected && (
                <Button onClick={handleSetReady}>
                  {creatorIsReady ? "Esperando" : "Listo"}
                </Button>
              )}
            </Box>
            <Box bgcolor={invitedIsReady ? "green" : "unset"} display={"flex"}>
              <Typography>{playerInvited.name}</Typography>
              {playerInvited.selected && (
                <Button onClick={handleSetReady}>
                  {invitedIsReady ? "Esperando" : "Listo"}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </RoundedBox>
    </Box>
  );
};

export default PrepareQuestions;
