import React, { useCallback, useContext, useEffect, useState } from "react";
import WhoKnowMoreEvent from "Types/WhoKnowMoreEvent";

export type SocketContext = {
  handleConnect: () => void;
  sendEvent: (data: string) => void;
  event?: WhoKnowMoreEvent;
  isConnected: boolean;
};
const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContext = React.createContext<SocketContext>({
  handleConnect: () => {},
  sendEvent: (_data: string) => {},
  isConnected: false,
});

export const SocketContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [webSocket, setSocket] = useState<WebSocket>();
  const [isConnected, setIsConnected] = useState(false);
  const [event, setEvent] = useState<WhoKnowMoreEvent>();
  const [hasInitialice, setHasInitialice] = useState(false);

  const handleConnect = () => {
    setSocket(
      new WebSocket("wss://xv54lcahc9.execute-api.us-east-1.amazonaws.com/dev")
    );
    setHasInitialice(true);
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
  }, [webSocket, hasInitialice]);

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
