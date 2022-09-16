import useGame from "Contexts/GameContext";
import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";

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
  const {
    handleAddPlayerInvite,
    handleAddPlayerCreator,
    handleSetRoomCode,
    userId,
    handleChangeRoute,
  } = useGame();

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
        handleChangeRoute("/questions");
      } else {
        setError(event.data.message as string);
      }
      setLoadingJoinRoom(false);
    }
  }, [event, handleAddPlayerInvite, handleAddPlayerCreator, handleSetRoomCode]);

  const submit = () => {
    setError(undefined);
    setLoadingJoinRoom(true);
    sendEvent({
      action: "JoinRoom",
      roomCode,
      name,
      userId,
    });
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
