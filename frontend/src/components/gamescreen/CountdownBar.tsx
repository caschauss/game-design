import { useEffect, useState } from "react";

interface CountdownBarProps {
  duration?: number;
  onComplete?: () => void;
  powerups?: string;
}

export default function CountdownBar({
  duration = 5,
  onComplete,
  powerups,
}: CountdownBarProps) {
  const hasExtraTime = powerups?.includes("extraTime");
  const bonusTime = 15;

  const [normalTimeLeft, setNormalTimeLeft] = useState(duration);
  const [bonusTimeLeft, setBonusTimeLeft] = useState(bonusTime);
  const [isBonusActive, setIsBonusActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isBonusActive) {
      if (normalTimeLeft > 0) {
        interval = setInterval(() => {
          setNormalTimeLeft((prev) => prev - 1);
        }, 1000);
      } else if (hasExtraTime) {
        setIsBonusActive(true);
      } else {
        onComplete?.();
      }
    } else {
      if (bonusTimeLeft > 0) {
        interval = setInterval(() => {
          setBonusTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        onComplete?.();
      }
    }

    return () => clearInterval(interval);
  }, [normalTimeLeft, bonusTimeLeft, isBonusActive, hasExtraTime, onComplete]);

  const totalDuration = duration + (hasExtraTime ? bonusTime : 0);

  // Bar widths in %
  const normalBarWidthPercent = (normalTimeLeft / duration) * 100;
  const bonusBarWidthPercent = hasExtraTime
    ? (bonusTimeLeft / bonusTime) * (bonusTime / totalDuration) * 100
    : 0;

  return (
    <div className="w-full">
      <div
        className={`pb-2 text-xl font-medium ${
          isBonusActive ? "text-blue-400" : "text-white"
        }`}
      >
        Zeit:{" "}
        <span
          className={`px-2 border-2 rounded-md font-bold ${
            isBonusActive ? "border-blue-400" : "border-white"
          }`}
        >
          {normalTimeLeft} + {isBonusActive ? bonusTimeLeft : bonusTime} sek
        </span>
      </div>

      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden flex relative">
        {/* Normal time bar */}

        {hasExtraTime && (
          <div
            className="h-full bg-blue-500 transition-all duration-1000 ease-linear w-96"
            style={{ width: `${bonusBarWidthPercent}%` }}
          />
        )}
        <div
          className="h-full bg-gradient-to-r from-emerald-600 from-80% to-red-700 transition-all duration-1000 ease-linear"
          style={{ width: `${normalBarWidthPercent}%` }}
        />
      </div>
    </div>
  );
}
