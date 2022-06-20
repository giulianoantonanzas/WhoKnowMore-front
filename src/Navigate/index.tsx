import PlayerLayout from "Layouts/FirtStepLayout";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Views/Home";

const RootNavigator: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PlayerLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigator;
