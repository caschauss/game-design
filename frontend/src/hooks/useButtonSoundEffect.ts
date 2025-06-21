import { useRef, useEffect, useCallback } from "react";
import { useSoundSettings } from "../components/audio/SoundSettings";

export function useButtonSoundEffect(audioUrl: string) {
  const { soundEffectsEnabled, volume } = useSoundSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
  }, [audioUrl]);

  const playSound = useCallback(() => {
    if (!soundEffectsEnabled || !audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = volume / 100;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Handle autoplay prevention silently
    });
  }, [soundEffectsEnabled, volume]);

  return playSound;
}
