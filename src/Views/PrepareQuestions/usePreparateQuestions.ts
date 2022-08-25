import useGame from "Contexts/GameContext";
import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";

type ReadyEvent = {
  playerReady: "invited" | "creator";
  message: string;
};

const usePreparateQuestions = () => {
  const { sendEvent, event } = useSocket();
  const { playerCreator, playerInvited, roomCode, userId } = useGame();
  const [creatorIsReady, setCreatorIsReady] = useState(false);
  const [invitedIsReady, setInvitedIsReady] = useState(false);
  const [loadingSuggeredQuestions, setLoadingSuggeredQuestions] =
    useState<boolean>();
  const [suggeredQuestions, setSuggeredQuestions] = useState<string[]>();

  useEffect(() => {
    if (event?.eventName === "GetSuggeredQuestions") {
      const currentEvent = event.data as { suggeredQuestions: string[] };
      setLoadingSuggeredQuestions(false);
      setSuggeredQuestions(currentEvent.suggeredQuestions);
    } else if (event?.eventName === "PlayerReady") {
      const currentEvent = event.data as ReadyEvent;
      if (currentEvent.playerReady === "creator") {
        setCreatorIsReady(true);
      } else if (currentEvent.playerReady === "invited") {
        setInvitedIsReady(true);
      }
    }
  }, [event]);

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
  };
};

export default usePreparateQuestions;
