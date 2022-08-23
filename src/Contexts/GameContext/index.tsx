import React, { useContext, useState } from "react";
import { Player } from "Types/Player";

export type GameContextType = {
  playerCreator: Player;
  playerInvited: Player;
  roomCode: string;
  handleAddPlayerCreator: (player: Player) => void;
  handleAddPlayerInvite: (player: Player) => void;
  handleSetRoomCode: (roomCode: string) => void;
};

const useGame = () => {
  return useContext(GameContext);
};

export const GameContext = React.createContext<GameContextType>({
  playerCreator: { name: "" },
  playerInvited: { name: "" },
  roomCode: "",
  handleAddPlayerCreator: (_player: Player) => {},
  handleAddPlayerInvite: (_player: Player) => {},
  handleSetRoomCode: (_roomCode: string) => {},
});

export const GameContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [playerCreator, setPlayerCreator] = useState<Player>({ name: "" });
  const [playerInvited, setPlayerInvited] = useState<Player>({ name: "" });
  const [roomCode, setRoomCode] = useState("");

  const handleAddPlayerCreator = (data: Player) => {
    setPlayerCreator(data);
  };

  const handleAddPlayerInvite = (data: Player) => {
    setPlayerInvited(data);
  };

  const handleSetRoomCode = (roomCodeParam: string) => {
    setRoomCode(roomCodeParam);
  };

  return (
    <GameContext.Provider
      value={{
        playerCreator,
        playerInvited,
        handleAddPlayerCreator,
        handleAddPlayerInvite,
        roomCode,
        handleSetRoomCode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default useGame;
