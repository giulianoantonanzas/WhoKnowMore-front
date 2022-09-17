import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";
import useGame from "Contexts/GameContext";
import Question from "Types/Question";

const useGamePlay = () => {
  const { sendEvent, event } = useSocket();
  const { userId, roomCode } = useGame();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLimit, setTime] = useState(10);
  const [answersIndexsSelected, setAnswersIndexsSelected] = useState<number[]>(
    []
  );
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState();

  console.log(answersIndexsSelected);

  useEffect(() => {
    if (timeLimit <= 0) {
      if (currentIndex < questions.length) {
        setTime(10);
        setCurrentIndex((prev) => prev + 1);
        if (currentIndex >= answersIndexsSelected.length)
          setAnswersIndexsSelected((prev) => [...prev, NaN]);
      }
    } else {
      setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
  }, [timeLimit]);

  useEffect(() => {
    sendEvent({ action: "GetEnemyQuestions", roomCode, userId });
  }, []);

  useEffect(() => {
    if (
      currentIndex === questions.length &&
      answersIndexsSelected.length === questions.length
    ) {
      setGameOver(true);
    }
  }, [currentIndex]);

  // useEffect(() => {
  //   if (gameOver) {
  //     sendEvent({
  //       action: "GameOver",
  //       roomCode,
  //       userId,
  //       answersIndexsSelected,
  //     });
  //   }
  // }, [gameOver]);

  const handleClickAnswer = (index: number) => {
    if (
      currentIndex <= questions.length &&
      currentIndex >= answersIndexsSelected.length
    ) {
      setAnswersIndexsSelected((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (event?.eventName === "GetEnemyQuestions") {
      const { questions } = event.data as { questions: Question[] };
      setQuestions(questions);
    }
    // if (event?.eventName === "GameResult") {
    // }
  }, [event]);

  return {
    questions,
    currentIndex,
    timeLimit,
    handleClickAnswer,
    answersIndexsSelected,
  };
};

export default useGamePlay;
