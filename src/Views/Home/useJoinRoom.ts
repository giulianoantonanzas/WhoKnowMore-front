import useGame from "Contexts/GameContext";
import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type JoinRoomEvent = {
  creatorName: string;
  message: string;
  roomId: string;
};

const useJoinRoom = (name: string) => {
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [loadingJoinRoom, setLoadingJoinRoom] = useState<boolean>();
  const [roomCode, setRoomCode] = useState<string>();
  const [error, setError] = useState<string>();
  const { handleConnect, sendEvent, event } = useSocket();
  const { handleAddPlayerInvite, handleAddPlayerCreator, handleSetRoomCode } =
    useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (openJoinModal) {
      handleConnect();
    }
  }, [openJoinModal]);

  const iterateJoinModal = () => {
    setOpenJoinModal((prev) => !prev);
    setError(undefined);
  };

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  useEffect(() => {
    if (event?.eventName === "JoinRoom") {
      if (event.eventResult === "success") {
        const currentEvent = event.data as JoinRoomEvent;
        handleSetRoomCode(currentEvent.roomId);
        handleAddPlayerInvite({ name, selected: true });
        handleAddPlayerCreator({
          name: currentEvent.creatorName,
          selected: false,
        });
        navigate("/questions");
      } else {
        setError(event.data.message as string);
      }
      setLoadingJoinRoom(false);
    }
  }, [event]);

  const submit = () => {
    setError(undefined);
    setLoadingJoinRoom(true);
    sendEvent(
      JSON.stringify({
        action: "JoinRoom",
        roomCode,
        name,
      })
    );
  };

  return {
    openJoinModal,
    iterateJoinModal,
    loadingJoinRoom,
    handleChangeCode,
    submit,
    error,
  };
};

export default useJoinRoom;
