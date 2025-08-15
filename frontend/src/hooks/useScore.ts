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
    hasPowerUps: boolean,
    eventMultiplier: number,
  ) => {
    let points = basePoints * (hasPowerUps ? 0.15 : 1.15);
    points *= difficulty;
    points += timeLeft * 100;
    points *= eventMultiplier;
    return Math.round(points);
  };

  const addScore = (
    timeLeft: number,
    basePoints: number,
    difficulty: number,
    hasPowerUps: boolean,
    eventMultiplier: number,
  ) => {
    const points = calculateScore(
      timeLeft,
      basePoints,
      difficulty,
      hasPowerUps,
      eventMultiplier,
    );
    setScore((prev) => prev + points);
    return points;
  };

  const resetScore = () => setScore(0);

  return { score, addScore, resetScore };
};
