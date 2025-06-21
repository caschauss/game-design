// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import StartMenu from "../views/StartManu";
import GameScreen from "../views/GameScreen";
import ResultScreen from "../views/ResultScreen";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartMenu />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/result" element={<ResultScreen />} />{" "}
      {/* Weitere Routen später z.B.: */}
      {/* <Route path="/play" element={<GameRound />} /> */}
    </Routes>
  );
}
