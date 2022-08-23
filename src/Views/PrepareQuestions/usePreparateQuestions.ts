import useSocket from "Contexts/SocketContext";
import { useEffect } from "react";

const usePreparateQuestions = () => {
  const { sendEvent, event } = useSocket();

  useEffect(() => {}, [event]);

  useEffect(() => {
    sendEvent(
      JSON.stringify({
        action: "StartGame",
      })
    );
  }, []);
};

export default usePreparateQuestions;
