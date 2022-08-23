import useGame from "Contexts/GameContext";
import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CreateRoomCode = {
  eventName: "createRoom";
  createdRoomId: string;
  data: { createdRoomId: string };
};

const useCreateRoom = (name: string) => {
  const [loadingCreateRoom, setLoadingCreateRoom] = useState<boolean>();
  const [roomCode, setRoomCode] = useState<string>();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { handleConnect, event, sendEvent, isConnected } = useSocket();
  const { handleAddPlayerCreator, handleSetRoomCode } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (openCreateModal) {
      handleConnect();
    }
  }, [openCreateModal]);

  useEffect(() => {
    if (isConnected) {
      setLoadingCreateRoom(true);
      sendEvent(
        JSON.stringify({
          action: "CreateRoom",
          name,
        })
      );
    }
  }, [isConnected]);

  useEffect(() => {
    if (event?.eventName === "CreateRoom") {
      const currentEvent = event.data as CreateRoomCode;
      setLoadingCreateRoom(false);
      handleSetRoomCode(currentEvent.createdRoomId);
      setRoomCode(currentEvent.createdRoomId);
      handleAddPlayerCreator({ name });
    } else if (event?.eventName === "MemberJoin") {
      navigate("/questions");
    }
  }, [event]);

  const iterateCreateModal = () => {
    setOpenCreateModal((prev) => !prev);
  };

  return {
    openCreateModal,
    iterateCreateModal,
    loadingCreateRoom,
    isConnected,
    roomCode,
  };
};

export default useCreateRoom;
