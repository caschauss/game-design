import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type CountdownOverlayProps = {
  startAfter?: number; // ms delay before starting countdown
  startNumber?: number; // starting number
  onComplete?: () => void;
};

const CountdownOverlay: React.FC<CountdownOverlayProps> = ({
  startAfter = 0,
  startNumber = 3,
  onComplete,
}) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const countdownAudio = new Audio("/audio/sounds/UI/countdown.mp3");

    const timer = setTimeout(() => {
      countdownAudio.play().catch(() => console.warn("Autoplay blockiert"));
      setCountdown(startNumber);
    }, startAfter);

    return () => clearTimeout(timer);
  }, [startAfter, startNumber]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      if (onComplete) onComplete();
      else navigate("/game");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate, onComplete]);

  if (countdown === null) return null;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
      <div className="relative bg-gradient-to-br from-zinc-900 via-red-900 to-zinc-900 text-center flex flex-col items-center justify-center px-20 py-16 rounded-3xl border-4 border-red-500 shadow-2xl shadow-red-500/50 backdrop-blur-sm">
        <div
          className="absolute -inset-4 bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl opacity-20 animate-spin"
          style={{ animationDuration: "3s" }}
        ></div>

        <div className="relative z-10">
          <p className="text-2xl font-bold text-red-300 mb-8 tracking-widest uppercase animate-bounce">
            Beginnt in
          </p>

          <div className="relative mb-8">
            <div className="absolute inset-0 text-9xl font-black text-red-500 blur-sm animate-ping opacity-30">
              {countdown}
            </div>

            <h1
              className="relative text-9xl font-black text-white drop-shadow-2xl animate-bounce"
              style={{
                textShadow:
                  "0 0 20px rgb(239 68 68), 0 0 40px rgb(239 68 68 / 0.5)",
                animationDuration: "0.8s",
              }}
            >
              {countdown}
            </h1>
          </div>

          <div className="flex justify-center gap-4">
            {[3, 2, 1].map((num) => (
              <div
                key={num}
                className={`w-5 h-5 rounded-full transition-all duration-500 ${
                  countdown <= num
                    ? "bg-red-500 shadow-lg shadow-red-500/80 animate-pulse scale-125"
                    : "bg-zinc-600 scale-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        <div
          className="absolute top-4 right-4 w-4 h-4 bg-red-500 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-4 left-4 w-4 h-4 bg-red-500 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-4 right-4 w-4 h-4 bg-red-500 rounded-full animate-ping"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
    </div>
  );
};

export default CountdownOverlay;
