import React, { createContext, useContext, useState } from "react";

interface SoundSettings {
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
  soundEffectsEnabled: boolean;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const SoundSettingsContext = createContext<SoundSettings | undefined>(
  undefined,
);

export const SoundSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [volume, setVolume] = useState(50);

  return (
    <SoundSettingsContext.Provider
      value={{
        musicEnabled,
        setMusicEnabled,
        soundEffectsEnabled,
        setSoundEffectsEnabled,
        volume,
        setVolume,
      }}
    >
      {children}
    </SoundSettingsContext.Provider>
  );
};

export const useSoundSettings = () => {
  const context = useContext(SoundSettingsContext);
  if (!context) {
    throw new Error(
      "useSoundSettings must be used within a SoundSettingsProvider",
    );
  }
  return context;
};
