import { useEffect, useState } from "react";

type CreateRoomCode = {
  eventName: "createRoom";
  createdRoomId: string;
  message: string;
};

const useCreateRoom = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loadingCreateRoom, setLoadingCreateRoom] = useState<boolean>();
  const [roomCode, setRoomCode] = useState<string>();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    if (openCreateModal) {
      const webSocket = new WebSocket(
        "wss://xv54lcahc9.execute-api.us-east-1.amazonaws.com/dev"
      );
      webSocket.onopen = () => {
        setIsConnected(true);
        setLoadingCreateRoom(true);
        webSocket.send(
          JSON.stringify({
            action: "createRoom",
          })
        );
      };
      webSocket.onmessage = (e) => {
        console.log("onmessage", e);
        const result = JSON.parse(e.data as string) as CreateRoomCode;
        if (result.eventName === "createRoom") {
          setRoomCode(
            (JSON.parse(e.data as string) as CreateRoomCode).createdRoomId
          );
          setLoadingCreateRoom(false);
        } else {
          alert(result.message);
        }
      };
      webSocket.onerror = (e) => {
        console.log("error", e);
      };
    }
  }, [openCreateModal]);

  const IterateCreateModal = () => {
    setOpenCreateModal((prev) => !prev);
  };

  return {
    openCreateModal,
    IterateCreateModal,
    loadingCreateRoom,
    isConnected,
    roomCode,
  };
};

export default useCreateRoom;
