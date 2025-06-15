import { useEffect, useState } from "react";

interface CountdownBarProps {
  duration?: number;
  onComplete?: () => void;
  powerups?: string;
}

export default function CountdownBar({
  duration = 30,
  onComplete,
}: CountdownBarProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  const barWidthPercent = (timeLeft / duration) * 100;

  return (
    <div className="w-full">
      <div className="pb-2 text-xl font-medium text-white">
        Zeit:{" "}
        <span className="px-2 border-2 rounded-md font-bold border-white">
          {timeLeft} sek
        </span>
      </div>

      <div className="w-full h-2 bg-red-700 rounded-full overflow-hidden flex relative">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 from-80% to-red-700 transition-all duration-1000 ease-linear"
          style={{ width: `${barWidthPercent}%` }}
        />
      </div>
    </div>
  );
}
