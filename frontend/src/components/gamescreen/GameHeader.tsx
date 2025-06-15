import CountdownBar from "./CountdownBar";
import { powerUps } from "../../data/data";

interface GameHeaderProps {
  playerName: string;
  selectedPowerUps: string[];
  question: string;
  score: number;
  round: number;
  onTimeUp: () => void;
  onTimeUpdate: (timeLeft: number) => void;
}

type PowerUp = {
  id: string;
  color: string;
  label: string;
  short: string;
};

export default function GameHeader({
  selectedPowerUps,
  question,
  score,
  round,
  onTimeUp,
  onTimeUpdate,
}: GameHeaderProps) {
  return (
    <div className="h-1/2 w-full flex flex-col justify-between">
      <div className="w-full h-full flex justify-between gap-4 px-8">
        {/* Power-Ups section */}
        <div className="flex flex-col w-full max-w-48">
          <p className="text-xl">Aktive Power-Ups</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 mr-auto">
            {selectedPowerUps.length > 0 ? (
              selectedPowerUps.map((id) => {
                const p = powerUps.find((p: PowerUp) => p.id === id);
                if (!p) return null;
                return (
                  <div key={id} className="flex flex-col items-center text-xs">
                    <div
                      className={`size-12 rounded-md flex items-center justify-center text-white font-bold ${p.color}`}
                    >
                      {p.short}
                    </div>
                    <span className="text-sm text-center ">{p.label}</span>
                  </div>
                );
              })
            ) : (
              <span className="text-sm text-zinc-500">Keine</span>
            )}
          </div>
        </div>

        {/* Question in the center */}
        <div className="flex flex-col w-full items-center gap-8">
          <h1 className="text-xl">PolitikschMERZen</h1>
          <h2 className="text-4xl italic font-bold max-w-2xl text-center">
            "{question}"
          </h2>
        </div>

        {/* Score & Round */}
        <div className="flex flex-col w-full max-w-32 text-right gap-4">
          <div>
            <h3 className="text-xl">Punkte</h3>
            <p className="text-xl font-bold">{score}</p>
          </div>
          <div>
            <h3 className="text-xl">Runde</h3>
            <p className="text-xl font-bold">{round}</p>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="w-full px-8 mt-4">
        <CountdownBar
          duration={30}
          onComplete={onTimeUp}
          onTimeUpdate={onTimeUpdate} // <-- Weiterleiten der onTimeUpdate Prop
          powerups={selectedPowerUps.join(",")}
        />
      </div>
    </div>
  );
}
