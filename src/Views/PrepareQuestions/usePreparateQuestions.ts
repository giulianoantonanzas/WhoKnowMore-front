import useGame from "Contexts/GameContext";
import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";

type ReadyEvent = {
  playerReady: "invited" | "creator";
  message: string;
};

type Question = {
  title: string;
  answers?: {
    title: string;
    isCorrect: boolean;
  }[];
};

const usePreparateQuestions = () => {
  const { sendEvent, event } = useSocket();
  const { playerCreator, roomCode, userId } = useGame();
  const [creatorIsReady, setCreatorIsReady] = useState(false);
  const [invitedIsReady, setInvitedIsReady] = useState(false);
  const [loadingSuggeredQuestions, setLoadingSuggeredQuestions] =
    useState<boolean>();
  const [myQuestions, setMyQuestions] = useState<Question[]>([]);
  const [suggeredQuestions, setSuggeredQuestions] = useState<string[]>();
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [indexSelectedQuestion, setIndexSelectedQuestion] = useState(0);

  useEffect(() => {
    if (event?.eventName === "GetSuggeredQuestions") {
      /**Obtengo las preguntas sugeridas */
      const currentEvent = event.data as { suggeredQuestions: string[] };
      setLoadingSuggeredQuestions(false);
      setSuggeredQuestions(currentEvent.suggeredQuestions);
    } else if (event?.eventName === "PlayerReady") {
      /**Detecto el evento de Player Ready */
      const currentEvent = event.data as ReadyEvent;
      if (currentEvent.playerReady === "creator") {
        setCreatorIsReady(true);
      } else if (currentEvent.playerReady === "invited") {
        setInvitedIsReady(true);
      }
    }
  }, [event]);

  useEffect(() => {
    setLoadingSuggeredQuestions(true);
    sendEvent(
      JSON.stringify({
        action: "GetSuggeredQuestions",
        roomCode,
      })
    );
  }, [roomCode, sendEvent]);

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(e.target.value);
  };

  const handleSelectQuetion = (index: number) => {
    setIndexSelectedQuestion(index);
  };

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerInput(e.target.value);
  };

  const handleSubmitQuestion = () => {
    if (questionInput !== "") {
      setQuestionInput("");
      handleAddQuestion(questionInput);
    }
  };

  const handleSubmitAnswer = () => {
    setMyQuestions((prev) => {
      prev[indexSelectedQuestion].answers = [
        ...(prev[indexSelectedQuestion].answers ?? []),
        { title: answerInput, isCorrect: false },
      ];
      return prev;
    });
    setAnswerInput("");
  };

  const handleRemoveAnswer = (index: number) => {
    setMyQuestions((prev) => {
      //@ts-ignore
      const currentAnswers = prev[indexSelectedQuestion].answers;
      currentAnswers?.splice(index, 1);
      prev[indexSelectedQuestion].answers = [...(currentAnswers ?? [])];
      return [...prev];
    });
  };

  const handleChangeIsCorrectAnswer = (index: number) => {
    setMyQuestions((prev) => {
      //@ts-ignore
      prev[indexSelectedQuestion].answers[index].isCorrect =
        //@ts-ignore
        !prev[indexSelectedQuestion].answers[index].isCorrect;
      return [...prev];
    });
  };

  const handleAddQuestion = (question: string) => {
    setMyQuestions((prev) => [...prev, { title: question }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setMyQuestions((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  const handleSetReady = () => {
    if (myQuestions.length < 3) {
      alert("ingresa al menos 3 preguntas");
    }
    if (playerCreator.selected) {
      setCreatorIsReady(true);
    } else {
      setInvitedIsReady(true);
    }

    sendEvent(
      JSON.stringify({
        action: "SetReady",
        roomCode,
        userId,
        myQuestions,
      })
    );
  };

  return {
    creatorIsReady,
    invitedIsReady,
    handleSetReady,
    suggeredQuestions,
    loadingSuggeredQuestions,
    handleAddQuestion,
    myQuestions,
    handleSubmitQuestion,
    questionInput,
    handleChangeQuestion,
    handleRemoveQuestion,
    handleChangeAnswer,
    handleSubmitAnswer,
    handleChangeIsCorrectAnswer,
    handleSelectQuetion,
    answerInput,
    indexSelectedQuestion,
    handleRemoveAnswer,
  };
};

export default usePreparateQuestions;
