import GameLyout from "Layouts/GameLyout";
import PlayerLayout from "Layouts/FirtStepLayout";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Views/Home";
import PrepareQuestions from "Views/PrepareQuestions";
import { GameContextProvider } from "Contexts/GameContext";
import GamePlay from "Views/GamePlay";

const RouteManager: React.FC = () => {
  return (
    <BrowserRouter>
      <GameContextProvider>
        <Routes>
          <Route element={<PlayerLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<GameLyout />}>
            <Route path="/questions" element={<PrepareQuestions />} />
            <Route path="/game-play" element={<GamePlay />} />
          </Route>
        </Routes>
      </GameContextProvider>
    </BrowserRouter>
  );
};

export default RouteManager;
