import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSoundSettings } from "./SoundSettings";

const playlist = [
  "/audio/bass.mp3",
  "/audio/jazz.mp3",
  "/audio/merkelLofi.mp3",
  "/audio/verfassungsschutz.mp3",
];

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();
  const { musicEnabled, volume } = useSoundSettings();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const isPlayingRef = useRef(false);

  // On mount, set src and start playing
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = playlist[currentTrackIndex];
    audioRef.current.loop = false;
    audioRef.current.volume = musicEnabled ? volume / 100 : 0;
    audioRef.current.play().catch(() => {});
    isPlayingRef.current = true;
  }, [currentTrackIndex, musicEnabled, volume]); // Only once on mount

  // Handle volume and pause/play on route or setting changes, no src change!
  useEffect(() => {
    if (!audioRef.current) return;

    if (!musicEnabled) {
      audioRef.current.pause();
      isPlayingRef.current = false;
    } else {
      audioRef.current.volume = volume / 100;

      if (!isPlayingRef.current) {
        audioRef.current.play().catch(() => {});
        isPlayingRef.current = true;
      }
    }

    // Quieter volume on /result page without stopping music
    if (location.pathname === "/result") {
      audioRef.current.volume = volume / 100 / 3;
    }
  }, [location.pathname, musicEnabled, volume]);

  // On track end, switch to next track and play
  const handleEnded = () => {
    if (!audioRef.current) return;
    const nextTrack = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextTrack);
    audioRef.current.src = playlist[nextTrack];
    audioRef.current.play().catch(() => {});
    isPlayingRef.current = true;
  };

  return <audio ref={audioRef} onEnded={handleEnded} />;
}
