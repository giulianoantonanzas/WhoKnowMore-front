import { useEffect, useState } from "react";

type JoinRoomResult = {
  eventName: "JoinRoom";
  eventResult: "failed" | "success";
  message: string;
};

const useJoinRoom = () => {
  const [openJoinModal, setOpenJoinModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loadingJoinRoom, setLoadingJoinRoom] = useState<boolean>();
  const [roomCode, setRoomCode] = useState<string>();
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    if (openJoinModal) {
      const webSocket = new WebSocket(
        "wss://xv54lcahc9.execute-api.us-east-1.amazonaws.com/dev"
      );
      webSocket.onopen = () => {
        setIsConnected(true);
      };
      setSocket(webSocket);
      webSocket.onmessage = (e) => {
        console.log(e);
        const result = JSON.parse(e.data as string) as JoinRoomResult;
        if (result) alert(result.message);
        setLoadingJoinRoom(false);
      };
      webSocket.onerror = (e) => {
        console.log("error", e);
      };
    }
  }, [openJoinModal]);

  const IterateJoinModal = () => {
    setOpenJoinModal((prev) => !prev);
  };

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  const submit = () => {
    if (socket) {
      setLoadingJoinRoom(true);
      socket.send(
        JSON.stringify({
          action: "joinRoom",
          roomCode,
        })
      );
    }
  };

  return {
    openJoinModal,
    IterateJoinModal,
    loadingJoinRoom,
    handleChangeCode,
    submit,
    isConnected,
  };
};

export default useJoinRoom;
