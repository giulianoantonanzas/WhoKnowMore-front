import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import RoundedBox from "Components/RoundedBox";
import ReadyBar from "./ReadyBar";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import usePreparateQuestions from "./usePreparateQuestions";
import usestyles from "./useStyles";

/**
 * @warning necesita una buena refactorizada...
 * */
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
    handleChangeQuestion,
    handleSubmitQuestion,
    questionInput,
    handleRemoveQuestion,
    handleChangeAnswer,
    handleChangeIsCorrectAnswer,
    handleSelectQuetion,
    handleSubmitAnswer,
    answerInput,
    indexSelectedQuestion,
    handleRemoveAnswer,
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
          width={"100%"}
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
            <Typography variant="h5">Preguntas</Typography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              gap={2}
            >
              <TextField
                onChange={handleChangeQuestion}
                placeholder="Ingrese una pregunta"
                value={questionInput}
                type={"text"}
              />
              <Button
                onClick={handleSubmitQuestion}
                color={"success"}
                variant={"contained"}
              >
                <CheckIcon />
              </Button>
            </Box>
            <Box className={styles.createdQuestions}>
              {myQuestions.map((question, index) => (
                <Box display={"flex"} key={index}>
                  <Button
                    onClick={() => handleSelectQuetion(index)}
                    variant={
                      indexSelectedQuestion === index ? "contained" : "outlined"
                    }
                    color="primary"
                    key={index}
                  >
                    {question.title}
                  </Button>
                  <Button
                    onClick={() => {
                      handleRemoveQuestion(index);
                    }}
                    variant="contained"
                    color="error"
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant={"h5"}>Respuestas</Typography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
              gap={2}
            >
              <TextField
                onChange={handleChangeAnswer}
                placeholder="La milanesa"
                value={answerInput}
                type={"text"}
              />
              <Button
                onClick={handleSubmitAnswer}
                color={"success"}
                variant={"contained"}
              >
                <CheckIcon />
              </Button>
            </Box>
            <Box className={styles.createdQuestions}>
              {myQuestions?.[indexSelectedQuestion]?.answers?.map(
                (answer, index) => (
                  <Box display={"flex"} key={index}>
                    <Button
                      onClick={() => handleChangeIsCorrectAnswer(index)}
                      variant="contained"
                      color={answer.isCorrect ? "success" : "error"}
                      key={index}
                    >
                      {answer?.title}
                    </Button>
                    <Button
                      onClick={() => {
                        handleRemoveAnswer(index);
                      }}
                      variant="contained"
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                )
              )}
            </Box>
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
