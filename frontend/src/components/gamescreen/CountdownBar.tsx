import { useEffect, useState } from "react";
import { useCountdownSound } from "../../hooks/useCountdownSound";

interface CountdownBarProps {
  duration: number;
  onComplete: () => void;
  onTimeUpdate: (timeLeft: number) => void;
  powerups: string;
}

export default function CountdownBar({
  duration = 60,
  onComplete,
  onTimeUpdate,
  powerups,
}: CountdownBarProps) {
  const FREEZE_DURATION = 15;
  const powerupList = powerups.split(",").map((p) => p.trim());
  const isTimeFreezeActive = powerupList.includes("timeFreeze");

  const [mainTimeLeft, setMainTimeLeft] = useState(duration);
  const [freezeTimeLeft, setFreezeTimeLeft] = useState(FREEZE_DURATION);
  const [freezeActive, setFreezeActive] = useState(false);

  const showFreezeBar = isTimeFreezeActive;

  // Countdown Sounds
  const { playReminder, playTick, startTimer, stopTimer } = useCountdownSound();

  useEffect(() => {
    startTimer(); // Timer starten
    return () => stopTimer(); // Timer stoppen beim Unmount
  }, [startTimer, stopTimer]);

  // Reset timers on duration/powerup change
  useEffect(() => {
    setMainTimeLeft(duration);
    setFreezeTimeLeft(FREEZE_DURATION);
    setFreezeActive(false);
  }, [duration, isTimeFreezeActive]);

  // Main timer countdown
  useEffect(() => {
    if (mainTimeLeft <= 0) {
      if (isTimeFreezeActive && !freezeActive) {
        setFreezeActive(true);
      } else if (!freezeActive) {
        onComplete();
      }
      return;
    }

    if (mainTimeLeft === Math.floor(duration / 2)) {
      playReminder();
    }

    if (mainTimeLeft <= 10) {
      playTick();
    }

    onTimeUpdate(mainTimeLeft);

    const interval = setInterval(() => {
      setMainTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [
    mainTimeLeft,
    onComplete,
    onTimeUpdate,
    isTimeFreezeActive,
    freezeActive,
    duration,
    playReminder,
    playTick,
  ]);

  // Freeze bonus timer countdown
  useEffect(() => {
    if (!freezeActive) return;

    if (!isTimeFreezeActive || freezeTimeLeft <= 0) {
      onComplete();
      return;
    }

    const freezeInterval = setInterval(() => {
      setFreezeTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(freezeInterval);
  }, [freezeActive, freezeTimeLeft, onComplete, isTimeFreezeActive]);

  const mainPercent = (mainTimeLeft / duration) * 100;
  const freezePercent = (freezeTimeLeft / FREEZE_DURATION) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Main timer */}
      <div>
        <div className="pb-2 text-xl font-medium text-white">
          Zeit:{" "}
          <span className="px-2 border-2 rounded-md font-bold border-white">
            {mainTimeLeft}
            {showFreezeBar && (
              <span className="font-bold text-cyan-300">
                {" + "}
                {freezeTimeLeft}
              </span>
            )}{" "}
            sek
          </span>
        </div>
        <div className="flex">
          {showFreezeBar && (
            <div className="w-1/3 h-2 bg-red-700 rounded-l-full overflow-hidden relative">
              <div
                className="h-full bg-cyan-400 transition-all duration-1000 ease-linear"
                style={{ width: `${freezePercent}%` }}
              />
            </div>
          )}
          <div className="w-full h-2 bg-red-700 rounded-r-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 from-80% to-red-700 transition-all duration-1000 ease-linear"
              style={{ width: `${mainPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
