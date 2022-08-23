import useGame from "Contexts/GameContext";
import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useJoinRoom = (name: string) => {
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [loadingJoinRoom, setLoadingJoinRoom] = useState<boolean>();
  const [roomCode, setRoomCode] = useState<string>();
  const { handleConnect, sendEvent, event } = useSocket();
  const { handleAddPlayerInvite } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (openJoinModal) {
      handleConnect();
    }
  }, [openJoinModal]);

  const iterateJoinModal = () => {
    setOpenJoinModal((prev) => !prev);
  };

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  useEffect(() => {
    if (event?.eventName === "JoinRoom") {
      handleAddPlayerInvite({ name });
      setLoadingJoinRoom(false);
      navigate("/questions");
    }
  }, [event]);

  const submit = () => {
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
  };
};

export default useJoinRoom;
