import { useState } from "react";

interface UseScoreProps {
  initialScore?: number;
}

export const useScore = ({ initialScore = 0 }: UseScoreProps = {}) => {
  const [score, setScore] = useState(initialScore);

  const calculateScore = (
    timeLeft: number,
    basePoints: number,
    difficulty: number,
    hasAnyPowerUps: boolean,
    hasDoublePointsThisRound: boolean,
    eventMultiplier: number,
  ) => {
    // 1) Startwert: Basis * 1.15, aber Malus wenn PowerUps vorhanden → nur 0.15
    let points = basePoints * (hasAnyPowerUps ? 0.15 : 1.15);

    // 2) Schwierigkeit einberechnen
    points *= difficulty;

    // 3) Zeitbonus
    points += timeLeft * 100;

    // 4) Doppelte Punkte aus PowerUp
    if (hasDoublePointsThisRound) {
      points *= 2;
    }

    // 5) Doppelte Punkte aus Event
    points *= eventMultiplier;

    // Debug-Ausgabe
    console.log({
      difficulty,
      hasAnyPowerUps,
      hasDoublePointsThisRound,
      eventMultiplier,
      calculatedPoints: points,
    });

    return Math.round(points);
  };

  const addScore = (
    timeLeft: number,
    basePoints: number,
    difficulty: number,
    hasAnyPowerUps: boolean,
    hasDoublePointsThisRound: boolean,
    eventMultiplier: number,
  ) => {
    const points = calculateScore(
      timeLeft,
      basePoints,
      difficulty,
      hasAnyPowerUps,
      hasDoublePointsThisRound,
      eventMultiplier,
    );
    setScore((prev) => prev + points);
    return points;
  };

  const resetScore = () => setScore(0);

  return { score, addScore, resetScore };
};
