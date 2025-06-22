import { useRef, useEffect, useCallback } from "react";
import { useSoundSettings } from "../components/audio/SoundSettings";

export function useButtonSoundEffect(audioUrl: string) {
  const { soundEffectsEnabled, volume } = useSoundSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const baseVolumeMultiplier = 1.5;

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
  }, [audioUrl]);

  const playSound = useCallback(() => {
    if (!soundEffectsEnabled || !audioRef.current) return;

    const audio = audioRef.current;
    const adjustedVolume = Math.min(1.0, (volume / 100) * baseVolumeMultiplier);
    audio.volume = adjustedVolume;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Handle autoplay prevention silently
    });
  }, [soundEffectsEnabled, volume]);

  return playSound;
}
