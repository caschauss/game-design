import { useLocation, useNavigate } from "react-router-dom";
import { powerUps } from "../data/data";
import { getSendScoreboardEntry, reloadExpressionArray } from "../api/quizAPI";
import SoundButton from "../components/audio/SoundButton";
import { useEffect } from "react";

export interface ScoreboardData {
  name: string;
  score: number;
  date: string;
  powerups?: string;
}

export default function ResultScreen() {
  const navigate = useNavigate();
  const d = new Date();
  const day = d.toLocaleDateString("de-DE");
  const resultSound = new Audio("/audio/sounds/UI/game_end.wav");
  const { state } = useLocation() as {
    state: {
      playerName: string;
      score: number;
      date: number;
      selectedPowerUps: string[];
    };
  };

  const selectedPowerUps = state.selectedPowerUps ?? [];

  const handleBackToMain = async () => {
    const resultData = {
      playerName: state.playerName,
      score: state.score,
      date: day,
      selectedPowerUps: selectedPowerUps, // Nur IDs, keine Icons!
    };

    try {
      await handleSendScoreboardEntry();
      await reloadExpressionArray(); // Reload-Methode aufrufen
      navigate("/", { state: resultData });
    } catch (error) {
      console.error("Fehler beim Zurückkehren zum Hauptmenü:", error);
    }
  };

  const handleSendScoreboardEntry = async () => {
    const scoreBoardEntry: ScoreboardData = {
      name: state.playerName,
      score: state.score,
      date: day, // lokal formatiertes Datum
      powerups: selectedPowerUps.join(","), // Nur IDs als kommaseparierte Liste
    };

    try {
      const response = await getSendScoreboardEntry(scoreBoardEntry);
      console.log("Sent Scoreboard entry. Response: ", response.message);
    } catch (error) {
      console.error("Fehler beim Senden des Scoreboard-Eintrags:", error);
    }
  };

  useEffect(() => {
    // Sound beim Laden abspielen
    resultSound.currentTime = 0; // sicherstellen, dass er von Anfang an startet
    resultSound
      .play()
      .catch((e) => console.log("Audio konnte nicht abgespielt werden:", e));
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center text-white px-8 py-16 gap-16">
      <h1 className="title">Runde vorbei! 🏁</h1>

      <div className="bg-zinc-800 rounded-xl p-8 w-full max-w-6xl shadow-lg my-auto grid grid-cols-2">
        <div className="mb-6">
          <h2 className="subsubheader">Spielername 🤫</h2>
          <p className="subheader">{state.playerName}</p>
        </div>
        <div className="mb-6 ml-auto flex flex-col items-end">
          <h2 className="subsubheader ">Datum 📅</h2>
          <p className="subheader">{day}</p>
        </div>

        <div className="mb-6">
          <h2 className="subsubheader">Erzielte Punkte 🎯</h2>
          <p className="subheader">{state.score} Punkte</p>
        </div>

        <div className="mb-6 ml-auto flex flex-col items-end">
          <h2 className="subsubheader">Verwendete Power-Ups 💣</h2>
          <div className="flex gap-4">
            {selectedPowerUps.length > 0 ? (
              selectedPowerUps.map((id) => {
                const p = powerUps.find((p) => p.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-sm ${p.color}`}
                    >
                      {p.icon}
                    </div>
                    <span className="text-sm mt-1 text-center">{p.label}</span>
                  </div>
                );
              })
            ) : (
              <p className="subheader col-span-3">Keine Power-Ups</p>
            )}
          </div>
        </div>
      </div>

      <SoundButton onClick={handleBackToMain} className="primaryBtn">
        Zurück zum Hauptmenü
      </SoundButton>
    </div>
  );
}
