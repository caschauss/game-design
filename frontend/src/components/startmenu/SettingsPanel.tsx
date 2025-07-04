import { useSoundSettings } from "../audio/SoundSettings";

export default function SettingsPanel() {
  const {
    musicEnabled,
    setMusicEnabled,
    soundEffectsEnabled,
    setSoundEffectsEnabled,
    volume,
    setVolume,
  } = useSoundSettings();

  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="subheader">Einstellungen</h2>

      {/* Visuell stuff as before */}

      <div className="w-full">
        <h3 className="subsubheader">Audio</h3>

        <div className="mb-4 flex flex-col justify-center items-start w-full">
          <p className="mb-1">Lautstärke</p>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-black"
          />
          <span className="text-sm text-gray-700 mx-auto">{volume}%</span>
        </div>

        <div className="mb-4 flex justify-between w-full">
          <p className="mb-1">Hintergrundmusik</p>
          <label className="flex items-center gap-2">
            <span>{musicEnabled ? "An" : "Aus"}</span>
            <input
              className="size-6 accent-black"
              type="checkbox"
              checked={musicEnabled}
              onChange={() => setMusicEnabled(!musicEnabled)}
            />
          </label>
        </div>

        <div className="mb-4 flex justify-between w-full">
          <p className="mb-1">Soundeffekte</p>
          <label className="flex items-center gap-2">
            <span>{soundEffectsEnabled ? "An" : "Aus"}</span>
            <input
              className="size-6 accent-black"
              type="checkbox"
              checked={soundEffectsEnabled}
              onChange={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
