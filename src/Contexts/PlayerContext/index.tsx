import React, { useContext, useState } from "react";

type PlayerType = {
  name: string;
};

export type PlayerContextType = {
  player: PlayerType;
};

const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerContext = React.createContext<PlayerContextType>({
  player: { name: "" },
});

export const PlayerContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerType>({ name: "" });

  return (
    <PlayerContext.Provider value={{ player }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default usePlayer;
