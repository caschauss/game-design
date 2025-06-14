import { useState } from "react";

export default function SettingsPanel() {
  const [redGreen, setRedGreen] = useState(false);
  const [blueYellow, setBlueYellow] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [volume, setVolume] = useState(50);

  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="subheader">Einstellungen</h2>

      <div>
        <h3 className="subsubheader">Visuell</h3>

        <div className="mb-4 flex justify-between w-full">
          <p className="mb-1 ">Rot-Grün-Schwäche</p>
          <label className="flex items-center gap-2">
            <span>{redGreen ? "An" : "Aus"}</span>
            <input
              type="checkbox"
              checked={redGreen}
              onChange={() => setRedGreen(!redGreen)}
            />
          </label>
        </div>

        <div className="mb-4 flex justify-between w-full">
          <p className="mb-1">Blau-Gelb-Schwäche</p>
          <label className="flex gap-2">
            <span>{blueYellow ? "An" : "Aus"}</span>
            <input
              type="checkbox"
              checked={blueYellow}
              onChange={() => setBlueYellow(!blueYellow)}
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <h3 className="subsubheader">Audio</h3>

        <div className="mb-4  flex flex-col justify-center items-start w-full">
          <p className="mb-1">Lautstärke</p>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-700 mx-auto">{volume}%</span>
        </div>

        <div className="mb-4 flex justify-between w-full">
          <p className="mb-1">Soundeffekte</p>
          <label className="flex items-center gap-2">
            <span>{soundEffects ? "An" : "Aus"}</span>
            <input
              type="checkbox"
              checked={soundEffects}
              onChange={() => setSoundEffects(!soundEffects)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
