import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import RoundedBox from "Components/RoundedBox";
import ReadyBar from "./ReadyBar";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import usePreparateQuestions from "./usePreparateQuestions";
import usestyles from "./useStyles";

const PrepareQuestions = () => {
  const styles = usestyles();
  const {
    creatorIsReady,
    invitedIsReady,
    handleSetReady,
    loadingSuggeredQuestions,
    suggeredQuestions,
    handleAddQuestion,
    myQuestions,
  } = usePreparateQuestions();

  return (
    <Box className={styles.content}>
      <RoundedBox className={styles.suggestedQuestions}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Preguntas sugeridas
        </Typography>{" "}
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"90%"}
          my={2}
          gap={"1rem"}
        >
          {loadingSuggeredQuestions && (
            <>
              <Skeleton width={"100%"} height={"1rem"} />
              <Skeleton width={"100%"} height={"1rem"} />
              <Skeleton width={"100%"} height={"1rem"} />
              <Skeleton width={"100%"} height={"1rem"} />
              <Skeleton width={"100%"} height={"1rem"} />
              <Skeleton width={"100%"} height={"1rem"} />
              <Skeleton width={"100%"} height={"1rem"} />
              <Skeleton width={"100%"} height={"1rem"} />
            </>
          )}
          {suggeredQuestions?.map((question, index) => {
            return (
              <Button
                onClick={() => handleAddQuestion(question)}
                disabled={Boolean(
                  myQuestions.find(
                    (currenQuestion) => currenQuestion.title === question
                  )
                )}
                fullWidth
                key={index}
                variant="outlined"
              >
                {question}
              </Button>
            );
          })}
        </Box>
      </RoundedBox>
      <RoundedBox className={styles.myQuestions}>
        <Box
          height={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Box>
            <Typography variant="h5">Preguntas en juego</Typography>
            <Box display={"flex"} justifyContent={"space-between"} gap={2}>
              <TextField type={"text"} />
              <Button color={"success"} variant={"contained"}>
                <CheckIcon />
              </Button>
            </Box>
            <Box className={styles.createdQuestions}>
              {myQuestions.map((question, index) => (
                <Box display={"flex"}>
                  <Button variant="contained" color="primary" key={index}>
                    {question.title}
                  </Button>
                  <Button variant="contained" color="error">
                    <DeleteIcon />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant={"h5"}>Respuestas</Typography>
          </Box>
        </Box>

        <ReadyBar
          creatorIsReady={creatorIsReady}
          invitedIsReady={invitedIsReady}
          handleSetReady={handleSetReady}
        />
      </RoundedBox>
    </Box>
  );
};

export default PrepareQuestions;
