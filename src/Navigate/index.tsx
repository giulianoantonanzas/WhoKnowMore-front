import GameLyout from "Layouts/GameLyout";
import PlayerLayout from "Layouts/FirtStepLayout";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Views/Home";
import PrepareQuestions from "Views/PrepareQuestions";

const RootNavigator: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PlayerLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<GameLyout />}>
          <Route path="/questions" element={<PrepareQuestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigator;
