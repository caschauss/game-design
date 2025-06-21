import { powerUps } from "../../../data/data";
import ActivatePowerup from "../../audio/ActivatePowerup";

interface PowerUpsSelectorProps {
  selectedPowerUps: string[];
  chosenPowerUp: string | null;
  usedPowerUps: string[];
  onChoosePowerUp: (id: string) => void;
}

export default function PowerUpsSelector({
  selectedPowerUps,
  chosenPowerUp,
  usedPowerUps,
  onChoosePowerUp,
}: PowerUpsSelectorProps) {
  return (
    <div className="flex flex-col w-full max-w-48">
      <p className="text-xl">Aktive Power-Ups</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 mr-auto">
        {selectedPowerUps.length > 0 ? (
          selectedPowerUps.map((id) => {
            const p = powerUps.find((p) => p.id === id);
            if (!p) return null;

            const isSelected = chosenPowerUp === id;
            const isDisabled =
              chosenPowerUp !== null || usedPowerUps.includes(id);

            return (
              <ActivatePowerup
                key={id}
                onClick={() => {
                  if (!chosenPowerUp && !usedPowerUps.includes(id)) {
                    onChoosePowerUp(id);
                  }
                }}
                disabled={isDisabled}
                className={`flex flex-col items-center text-xs transition-all duration-200 ${
                  isDisabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                <div
                  className={`size-12 rounded-md flex items-center justify-center text-white font-bold ${p.color} ${
                    isSelected ? "ring-4 ring-yellow-300" : ""
                  }`}
                >
                  {p.short}
                </div>
                <span className="text-sm text-center">{p.label}</span>
              </ActivatePowerup>
            );
          })
        ) : (
          <span className="text-sm text-zinc-500">Keine</span>
        )}
      </div>
    </div>
  );
}
