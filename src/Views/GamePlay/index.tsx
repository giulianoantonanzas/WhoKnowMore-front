import RoundedBox from "Components/RoundedBox";
import useGamePlay from "./useGamePlay";
import { Typography, Box, Button } from "@mui/material";

const GamePlay = () => {
  const {
    questions,
    currentIndex,
    timeLimit,
    answersIndexsSelected,
    handleClickAnswer,
  } = useGamePlay();

  return (
    <RoundedBox>
      <Typography variant="h4">
        Pregunta {currentIndex} de {questions.length}
      </Typography>
      <Typography variant="h4">te quedan {timeLimit}</Typography>
      <Typography variant="h2">{questions[currentIndex]?.title}</Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"2rem"}
        width={"100%"}
        my={3}
      >
        {questions[currentIndex]?.answers?.map((answer, index) => {
          let color: "success" | "error" | undefined;
          if (answersIndexsSelected?.[currentIndex] !== undefined) {
            color = answer.isCorrect ? "success" : "error";
          }
          return (
            <Button
              onClick={() => {
                handleClickAnswer(index);
              }}
              key={index}
              color={color}
              variant="contained"
              fullWidth
            >
              <Typography variant="h5">{answer.title}</Typography>
            </Button>
          );
        })}
      </Box>
    </RoundedBox>
  );
};

export default GamePlay;
