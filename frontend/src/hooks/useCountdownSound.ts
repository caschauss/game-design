import { useRef } from "react";

export function useCountdownSound(
  reminderUrl: string = "/audio/sounds/low-on-time.mp3",
  tickUrl: string = "/audio/sounds/buttonClick.mp3",
  timerUrl: string = "/audio/sounds/UI/timer.mp3",
  tickVolume: number = 0.5,
  timerVolume: number = 0.3,
) {
  const reminderSound = useRef(new Audio(reminderUrl));
  const tickSound = useRef(new Audio(tickUrl));
  const timerSound = useRef(new Audio(timerUrl));

  // Timer-Sound vorbereiten: loop, Lautstärke
  timerSound.current.loop = true;
  timerSound.current.volume = timerVolume;

  const playReminder = () => {
    reminderSound.current.currentTime = 0;
    reminderSound.current.play().catch(() => {});
  };

  const playTick = () => {
    const audio = tickSound.current;
    audio.currentTime = 0;
    audio.volume = tickVolume * (0.9 + Math.random() * 0.2);
    audio.play().catch(() => {});
  };

  const startTimer = () => {
    timerSound.current.currentTime = 0;
    timerSound.current.volume = timerVolume * (0.4 + Math.random() * 0.4);
    timerSound.current.play().catch(() => {});
  };

  const stopTimer = () => {
    timerSound.current.pause();
    timerSound.current.currentTime = 0;
  };

  return { playReminder, playTick, startTimer, stopTimer };
}
