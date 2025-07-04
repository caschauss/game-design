interface ScoreRoundDisplayProps {
  score: number;
  round: number;
  showDoublePoints: boolean;
  lives: number;
}

export default function ScoreRoundDisplay({
  score,
  round,
  showDoublePoints,
  lives,
}: ScoreRoundDisplayProps) {
  const maxLives = 3;

  return (
    <div className="flex flex-col w-full max-w-32 text-right gap-4">
      <div className="w-full">
        <div className="flex justify-end">
          {showDoublePoints && (
            <div className="flex w-full justify-between">
              <p className="w-fit border-2 border-pink-600 text-pink-500 bg-pink-600/15 px-2 rounded-xl font-bold">
                x2
              </p>
            </div>
          )}
          <h3 className="text-xl pl-2">Punkte</h3>
        </div>
        <p className="text-xl font-bold">{score}</p>
      </div>

      <div>
        <h3 className="text-xl">Runde</h3>
        <p className="text-xl font-bold">{round}</p>
      </div>

      <div>
        <h3 className="text-xl">Leben</h3>
        <p className="flex justify-end space-x-1 text-rose-600">
          {[...Array(maxLives)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < lives ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          ))}
        </p>
      </div>
    </div>
  );
}
