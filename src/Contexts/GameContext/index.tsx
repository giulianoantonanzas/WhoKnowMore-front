import React, { useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "Types/Player";

export type GameContextType = {
  playerCreator: Player;
  playerInvited: Player;
  roomCode: string;
  handleAddPlayerCreator: (player: Player) => void;
  handleAddPlayerInvite: (player: Player) => void;
  handleSetRoomCode: (roomCode: string) => void;
  handleChangeRoute: (route: string) => void;
  userId: string;
  isRerouting: boolean;
};

const useGame = () => {
  return useContext(GameContext);
};

export const GameContext = React.createContext<GameContextType>({
  playerCreator: { name: "", selected: false },
  playerInvited: { name: "", selected: false },
  roomCode: "",
  userId: "",
  handleAddPlayerCreator: (_player: Player) => {},
  handleAddPlayerInvite: (_player: Player) => {},
  handleSetRoomCode: (_roomCode: string) => {},
  handleChangeRoute: (_route: string) => {},
  isRerouting: false,
});

export const GameContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [playerCreator, setPlayerCreator] = useState<Player>({
    name: "",
    selected: false,
  });
  const [playerInvited, setPlayerInvited] = useState<Player>({
    name: "",
    selected: false,
  });
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const userIdGenerated = useRef(crypto.randomUUID());
  const [isRerouting, setIsRerouting] = useState(false);
  const handleAddPlayerCreator = (data: Player) => {
    setPlayerCreator(data);
  };

  const handleAddPlayerInvite = (data: Player) => {
    setPlayerInvited(data);
  };

  const handleSetRoomCode = (roomCodeParam: string) => {
    setRoomCode(roomCodeParam);
  };

  const handleChangeRoute = useCallback(
    (route: string) => {
      setIsRerouting(true);
      setTimeout(() => {
        setIsRerouting(false);
        navigate(route);
      }, 1000);
    },
    [navigate]
  );

  return (
    <GameContext.Provider
      value={{
        playerCreator,
        playerInvited,
        handleAddPlayerCreator,
        handleAddPlayerInvite,
        roomCode,
        userId: userIdGenerated.current,
        handleSetRoomCode,
        isRerouting,
        handleChangeRoute,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default useGame;
