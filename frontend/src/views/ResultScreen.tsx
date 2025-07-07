import { useLocation, useNavigate } from "react-router-dom";
import { powerUps } from "../data/data";
import { getSendScoreboardEntry } from "../api/quizAPI";

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
      selectedPowerUps: selectedPowerUps.map((id) => {
        // Convert IDs (e.g. "doublePoints") to their 2-letter codes "2X" from powerUps data
        const pu = powerUps.find((p) => p.id === id);
        return pu?.short ?? id; // fallback to ID if no match
      }),
    };

    await handleSendScoreboardEntry();
    navigate("/", { state: resultData });
  };

  const handleSendScoreboardEntry = async () => {
    const scoreBoardEntry: ScoreboardData = {
      name: state.playerName,
      score: state.score,
      date: day, // das lokal formatierte Datum
      powerups: selectedPowerUps
        .map((id) => {
          const pu = powerUps.find((p) => p.id === id);
          return pu?.short ?? id;
        })
        .join(","), // Powerups als kommaseparierte Liste
    };

    try {
      const response = await getSendScoreboardEntry(scoreBoardEntry);
      console.log("Sent Scoreboard entry. Response: ", response.message);
    } catch (error) {
      console.error("Fehler beim Senden des Scoreboard-Eintrags:", error);
    }
  };

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
                      {p.short}
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

      <button onClick={handleBackToMain} className="primaryBtn">
        Zurück zum Hauptmenü
      </button>
    </div>
  );
}
