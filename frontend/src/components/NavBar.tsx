// src/components/NavBar.tsx
import {
  testAPI,
  getColor,
  setColor,
  getRoundInformation,
} from "../api/quizAPI";

import { useState } from "react";

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
      <button className="debugBtn" onClick={handleRoundInfo}>
        Round Info
      </button>
      <h1> = {output}</h1>
    </nav>
  );
}
