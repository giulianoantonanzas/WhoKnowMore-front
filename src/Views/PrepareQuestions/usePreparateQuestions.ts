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

  const handleAddQuestion = (question: string) => {
    setMyQuestions((prev) => [...prev, { title: question }]);
  };

  const handleSetReady = () => {
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
      })
    );
  };
  useEffect(() => {
    setLoadingSuggeredQuestions(true);
    sendEvent(
      JSON.stringify({
        action: "GetSuggeredQuestions",
        roomCode,
      })
    );
  }, [roomCode, sendEvent]);

  return {
    creatorIsReady,
    invitedIsReady,
    handleSetReady,
    suggeredQuestions,
    loadingSuggeredQuestions,
    handleAddQuestion,
    myQuestions,
  };
};

export default usePreparateQuestions;
