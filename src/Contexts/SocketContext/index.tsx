import React, { useCallback, useContext, useEffect, useState } from "react";
import WhoKnowMoreEvent from "Types/WhoKnowMoreEvent";

export type SocketContext = {
  handleConnect: () => void;
  sendEvent: (data: string) => void;
  event?: WhoKnowMoreEvent;
  isConnected: boolean;
  handleDisconect: () => void;
};
const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContext = React.createContext<SocketContext>({
  handleConnect: () => {},
  sendEvent: (_data: string) => {},
  isConnected: false,
  handleDisconect: () => {},
});

export const SocketContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [webSocket, setSocket] = useState<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);
  const [event, setEvent] = useState<WhoKnowMoreEvent>();

  const handleConnect = useCallback(() => {
    setSocket(
      new WebSocket("wss://xv54lcahc9.execute-api.us-east-1.amazonaws.com/dev")
    );
  }, []);

  const handleDisconect = () => {
    if (webSocket) {
      webSocket.send(JSON.stringify({ action: "$disconnect" }));
      setSocket(undefined);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (webSocket) {
      webSocket.onopen = () => {
        setIsConnected(true);
      };
      webSocket.onmessage = (e) => {
        console.log("onmessage", e);
        const result = JSON.parse(e.data as string) as WhoKnowMoreEvent;
        setEvent(result);
      };
      webSocket.onerror = (e) => {
        console.log("on error", e);
      };
      webSocket.onclose = (e) => {
        setIsConnected(false);
        console.log("on close", e);
      };
    }
  }, [webSocket]);

  const sendEvent = useCallback(
    (data: string) => {
      if (webSocket) {
        webSocket.send(data);
      }
    },
    [webSocket]
  );

  return (
    <SocketContext.Provider
      value={{
        handleConnect,
        handleDisconect,
        sendEvent,
        event,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default useSocket;
