import { useRef, useCallback } from "react";
import { useSoundSettings } from "../components/audio/SoundSettings";

export function useInputSoundEffect(audioUrl: string) {
  const { soundEffectsEnabled, volume } = useSoundSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(audioUrl);
  }

  const playSound = useCallback(() => {
    if (!soundEffectsEnabled || !audioRef.current) return;

    const audio = audioRef.current;

    // Add a little random volume variation
    const minVol = volume / 100 - 0.1;
    const maxVol = volume / 100 + 0.05;
    audio.volume = Math.max(
      0,
      Math.min(1, Math.random() * (maxVol - minVol) + minVol),
    );

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [soundEffectsEnabled, volume]);

  return playSound;
}
