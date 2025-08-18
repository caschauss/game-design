import { useRef } from "react";

export function useAnswerSound(
  correctSoundUrl: string = "/audio/sounds/UI/correct_answer.wav",
  wrongSoundUrl: string = "/audio/sounds/UI/wrong_answer2.wav",
) {
  const correctSound = useRef(new Audio(correctSoundUrl));
  const wrongSound = useRef(new Audio(wrongSoundUrl));

  // Lautstärken festlegen
  const correctVolume = 1; // volle Lautstärke
  const wrongVolume = 0.2; // deutlich leiser

  const play = (isCorrect: boolean) => {
    const sound = isCorrect ? correctSound.current : wrongSound.current;
    sound.currentTime = 0;
    sound.volume = isCorrect ? correctVolume : wrongVolume;
    sound.play().catch(() => {});
  };

  return { play };
}
