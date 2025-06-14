// src/routes/index.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartMenu from "../views/StartManu";
import GameScreen from "../views/GameScreen";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="/game" element={<GameScreen />} />
        {/* Weitere Routen später z.B.: */}
        {/* <Route path="/play" element={<GameRound />} /> */}
      </Routes>
    </Router>
  );
}
