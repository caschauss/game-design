import { useLocation, useNavigate } from "react-router-dom";
import { powerUps } from "../data/data";

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

  const handleBackToMain = () => {
    const resultData = {
      playerName: state.playerName,
      score: state.score * 1.217 * 10000,
      date: day,
      selectedPowerUps: selectedPowerUps.map((id) => {
        // Convert IDs (e.g. "doublePoints") to their 2-letter codes "2X" from powerUps data
        const pu = powerUps.find((p) => p.id === id);
        return pu?.short ?? id; // fallback to ID if no match
      }),
    };

    navigate("/", { state: resultData });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white px-8 py-16 gap-16">
      <h1 className="title">Runde vorbei!</h1>

      <div className="bg-zinc-800 rounded-xl p-8 w-full max-w-2xl shadow-lg my-auto">
        <div className="mb-6">
          <h2 className="subsubheader">Spielername</h2>
          <p className="subheader">{state.playerName}</p>
        </div>
        <div className="mb-6">
          <h2 className="subsubheader">Datum </h2>
          <p className="subheader">{day}</p>
        </div>

        <div className="mb-6">
          <h2 className="subsubheader">Erzielte Punkte</h2>
          <p className="subheader">{state.score} Punkte</p>
        </div>

        <div className="mb-6">
          <h2 className="subsubheader">Verwendete Power-Ups</h2>
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
