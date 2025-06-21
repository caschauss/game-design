import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { powerUps } from "../../data/data";
import { handleCallNewRound } from "../../api/quizAPI";
import PowerupButton from "../audio/PowerupButton";
import { useInputSoundEffect } from "../../hooks/useInputSoundEffect";

export default function StartPanel() {
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [answerOption, setAnswerOption] = useState("2x auswählen");
  const [selected, setSelected] = useState<string[]>([]);
  const playInputSound = useInputSoundEffect("/audio/sounds/keyboard.mp3");
  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName) {
      return;
    }
    handleCallNewRound();

    navigate("/game", {
      state: {
        playerName,
        difficulty,
        answerOption,
        selectedPowerUps: selected,
      },
    });
  };

  const toggleSelection = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        // deselect
        return prev.filter((item) => item !== id);
      } else if (prev.length < 2) {
        // select if less than 2 selected
        return [...prev, id];
      }
      return prev; // ignore clicks if already 2 selected
    });
  };

  function getRandomPowerUps(count: number): string[] {
    const shuffled = [...powerUps].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((p) => p.id);
  }

  return (
    <div className="mt-8 flex flex-col gap-6 w-full">
      <h2 className="subheader mx-auto">Spieleinstellungen</h2>

      <div className="flex flex-col items-center gap-4">
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleStart}
        >
          <input
            required={true}
            type="text"
            placeholder="Kim Meier"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              playInputSound();
            }}
            className="mb-4 border-2 border-zinc-900 w-full p-2 focus:outline-2 focus:outline-white rounded-md max-w-72 mx-auto"
          />

          {/* Schwierigkeitsstufe */}
          <div className="my-2 w-full">
            <p className="subsubheader mb-2 w-full text-center">
              Schwierigkeitsstufe{" "}
            </p>

            <div className="mb-4 flex flex-col justify-center items-start w-full accent-black max-w-72 mx-auto">
              <input
                type="range"
                min={1}
                max={3}
                step={1}
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full accent-black "
              />
              <div className="w-full flex justify-between text-sm text-zinc-900 px-1">
                <span>Einfach</span>
                <span>Mittel</span>
                <span>Schwer</span>
              </div>
            </div>
          </div>

          {/* Antwortoptionen */}
          <div className="my-2 w-full ">
            <p className="subsubheader mb-2 w-full text-center">
              Power-Ups auswählen
            </p>
            <div className="flex justify-between ">
              {["Keine", "2x Auswählen", "4x Zufällige"].map((label) => (
                <label
                  key={label}
                  className="flex flex-col items-center gap-1 w-1/3 text-center"
                >
                  <input
                    type="radio"
                    name="answer-options"
                    checked={answerOption === label}
                    onChange={() => {
                      setAnswerOption(label);
                      if (label === "2x Auswählen") {
                        setSelected([]);
                      } else if (label === "4x Zufällige") {
                        setSelected(getRandomPowerUps(4));
                      } else {
                        setSelected([]);
                      }
                    }}
                    className="size-6 accent-black"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PowerUps nur anzeigen, wenn "2x auswählen" */}
          {answerOption === "2x Auswählen" ? (
            <div className="flex flex-col w-full max-w-96">
              <div className="grid grid-cols-4 mt-4 gap-4 w-full place-items-center">
                {powerUps.map((powerUp) => {
                  const isSelected = selected.includes(powerUp.id);
                  const isDisabled =
                    answerOption === "2x Auswählen"
                      ? !isSelected && selected.length >= 2
                      : true;

                  return (
                    <div
                      key={powerUp.id}
                      className="flex flex-col items-center gap-1"
                    >
                      <PowerupButton
                        type="button"
                        onClick={() =>
                          answerOption === "2x Auswählen" &&
                          !isDisabled &&
                          toggleSelection(powerUp.id)
                        }
                        disabled={isDisabled}
                        isActive={isSelected}
                        className={`aspect-square w-10 rounded-md flex items-center justify-center font-bold text-white
                          ${powerUp.color}
                          ${isDisabled ? "opacity-25 cursor-not-allowed" : "opacity-80 hover:opacity-100"}
                        `}
                        title={powerUp.label}
                      >
                        {powerUp.short}
                      </PowerupButton>
                      <span className="text-sm text-center">
                        {powerUp.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm mx-auto mt-4">Wähle 2 Power-Ups aus!</p>
            </div>
          ) : null}

          <button
            type="submit"
            className=" cursor-pointer italic mt-4 p-2 bg-zinc-900 text-white rounded-lg w-48 text-xl uppercase font-semibold"
          >
            {" "}
            Los Gehts!
          </button>
        </form>
      </div>
    </div>
  );
}
