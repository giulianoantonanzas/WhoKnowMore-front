import useGame from "Contexts/GameContext";
import useSocket from "Contexts/SocketContext";
import { useEffect, useState } from "react";

type CreateRoomEvent = {
  roomId: string;
};

type MemerJoin = {
  message: string;
  invitedName: string;
};

const useCreateRoom = (name: string) => {
  const [loadingCreateRoom, setLoadingCreateRoom] = useState<boolean>(true);
  const [roomCode, setRoomCode] = useState<string>();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { handleDisconect, handleConnect, event, sendEvent, isConnected } =
    useSocket();
  const {
    handleAddPlayerCreator,
    handleAddPlayerInvite,
    handleSetRoomCode,
    userId,
    handleChangeRoute,
  } = useGame();

  useEffect(() => {
    if (openCreateModal) {
      handleConnect();
    } else {
      setRoomCode("");
      handleDisconect();
    }
  }, [openCreateModal]);

  useEffect(() => {
    if (isConnected) {
      setLoadingCreateRoom(true);
      sendEvent({
        action: "CreateRoom",
        name,
        userId,
      });
    }
  }, [isConnected]);

  useEffect(() => {
    if (event?.eventName === "CreateRoom" && event.eventResult === "success") {
      const currentEvent = event.data as CreateRoomEvent;
      setLoadingCreateRoom(false);
      handleSetRoomCode(currentEvent.roomId);
      setRoomCode(currentEvent.roomId);
    } else if (event?.eventName === "PlayerJoin") {
      const currentEvent = event.data as MemerJoin;
      handleAddPlayerCreator({ name, selected: true });
      handleAddPlayerInvite({
        name: currentEvent.invitedName,
        selected: false,
      });
      handleChangeRoute("/questions");
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
