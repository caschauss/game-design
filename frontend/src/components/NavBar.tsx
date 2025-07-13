// src/components/NavBar.tsx
import {
  testAPI,
  getColor,
  setColor,
  getRoundInformation,
  handleCallNewRound,
  getScoreboard,
  getSendScoreboardEntry,
} from "../api/quizAPI";

import { useState } from "react";

interface ScoreboardData {
  name: string;
  score: number;
  date: string;
  powerups?: string;
}

export default function NavBar() {
  const [output, setOutput] = useState("");
  const handleTest = async () => {
    const data = await testAPI();

    console.log("Test dataAPI result:", data);
    setOutput(data.message);
  };

  const handleGetColor = async () => {
    const color = await getColor();
    console.log("Current color:", color);
    setOutput(color.color);
  };

  const handleSetColor = async (color: string) => {
    await setColor(color);
    console.log(`Color set to: ${color}`);
    setOutput(color);
  };

  const handleRoundInfo = async () => {
    const roundData = await getRoundInformation();
    console.log("Round Info:", roundData);
    setOutput(roundData.expression);
  };

  const handleCallScoreboard = async () => {
    try {
      const scoreboard = await getScoreboard(); // ✅ Jetzt direkt ein Array

      const sorted = scoreboard.sort(
        (a: ScoreboardData, b: ScoreboardData) => b.score - a.score,
      );
      const top10 = sorted.slice(0, 10);

      console.log("Top 10 Scoreboard Entries:", top10);
    } catch (error) {
      console.error("Fehler beim Abrufen des Scoreboards:", error);
    }
  };

  const handleSendScoreboardEntry = async () => {
    const scoreBoardEntry: ScoreboardData = {
      name: "HierKönnteIhreWerbungStehen(RaLfScHuHmAcHeR)",
      score: 1312,
      date: "YYYY-MM-DD",
      powerups: "",
    };
    const response = await getSendScoreboardEntry(scoreBoardEntry);
    console.log("Sent Scoreboard entry. Response: ", response.message);
  };

  const handleGetScore = async () => {
    try {
      const response = await fetch("http://localhost:3000/getscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "get score" }), // placeholder message
      });

      const data = await response.json();
      console.log("Received score: ", data.score);
    } catch (error) {
      console.error("Error getting score: ", error);
    }
  };

  return (
    <nav className=" bg-zinc-900 absolute top-0 text-white p-2 flex gap-2 shadow-md w-full justify-center items-center">
      <span className="font-bold mr-4">Debug Menu</span>
      <button className="debugBtn" onClick={handleTest}>
        Test API
      </button>
      <button className="debugBtn" onClick={handleGetColor}>
        Get Color
      </button>
      <button className="debugBtn" onClick={() => handleSetColor("white")}>
        White
      </button>
      <button className="debugBtn" onClick={() => handleSetColor("black")}>
        Black
      </button>
      <button className="debugBtn" onClick={handleGetScore}>
        Score Info
      </button>
      <button className="debugBtn" onClick={handleRoundInfo}>
        Round Info
      </button>
      <button className="debugBtn" onClick={handleCallNewRound}>
        New Round
      </button>
      <button className="debugBtn" onClick={handleCallScoreboard}>
        Scoreboard
      </button>
      <button className="debugBtn" onClick={handleSendScoreboardEntry}>
        Send Scoreboard
      </button>
      <h1> = {output}</h1>
    </nav>
  );
}
