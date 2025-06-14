import CountdownBar from "./CountdownBar"; // ← Pfad ggf. anpassen

interface GameHeaderProps {
  playerName: string;
  selectedPowerUps: string[];
  question: string;
  score: number;
  round: number;
  onTimeUp: () => void;
}

export default function GameHeader({
  selectedPowerUps,
  question,
  score,
  round,
  onTimeUp,
}: GameHeaderProps) {
  return (
    <div className="h-1/2 w-full flex flex-col justify-between">
      <div className="w-full h-full flex justify-between gap-4 px-8">
        <div className="flex flex-col w-full max-w-48">
          <p className="text-xl">Aktives Power-Up</p>
          <h3 className="text-xl font-bold">{selectedPowerUps.join(", ")}</h3>
        </div>

        <div className="flex flex-col w-full items-center gap-8">
          <h1 className="text-xl">PolitikschMERZen</h1>
          <h2 className="text-4xl italic font-bold max-w-2xl text-center">
            "{question}"
          </h2>
        </div>

        <div className="flex flex-col w-full max-w-32 text-right gap-4">
          <div>
            <h3 className="text-xl">Punkte</h3>
            <p className="text-xl font-bold">{score}</p>
          </div>
          <div>
            <h3 className="text-xl">Runde</h3>
            <p className="text-xl font-bold">{round} / 10</p>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="w-full px-8 mt-4">
        <CountdownBar
          duration={30}
          onComplete={onTimeUp}
          powerups={selectedPowerUps.join(", ")}
        />
      </div>
    </div>
  );
}
