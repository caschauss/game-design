import { useRef, useEffect, useCallback } from "react";
import { useSoundSettings } from "../components/audio/SoundSettings";

export function useButtonSoundEffect(audioUrl: string, volumeMultiplier = 1) {
  const { soundEffectsEnabled, volume } = useSoundSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const baseVolumeMultiplier = 1;

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
  }, [audioUrl]);

  const playSound = useCallback(() => {
    if (!soundEffectsEnabled || !audioRef.current) return;

    const audio = audioRef.current;

    // Basislautstärke
    const adjustedVolume = Math.min(
      1.0,
      (volume / 100) * baseVolumeMultiplier * volumeMultiplier,
    );

    // Leichte Zufallsvariation pro Klick
    const volumeVariation = 0.7 + Math.random() * 0.7; // 0.9 - 1.1
    const rateVariation = 0.95 + Math.random() * 0.3; // 0.95 - 1.05

    audio.volume = Math.min(1, adjustedVolume * volumeVariation);
    audio.playbackRate = rateVariation;
    audio.currentTime = 0;

    audio.play().catch(() => {
      // autoplay prevention silently
    });
  }, [soundEffectsEnabled, volume]);

  return playSound;
}
