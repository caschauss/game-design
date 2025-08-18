import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { powerUps, names, surnames } from "../../data/data";
import {
  handleCallNewRound,
  setDifficulty as sendDifficultyToBackend,
} from "../../api/quizAPI";
import SoundButton from "../audio/SoundButton";
import { InputSound } from "../audio/InputSound";

export default function StartPanel() {
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [answerOption, setAnswerOption] = useState("2x auswählen");
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const startSound = new Audio("/audio/sounds/UI/game_start2.wav");

  const startingSound = () => {
    // Sound beim Laden abspielen
    startSound.currentTime = 0; // sicherstellen, dass er von Anfang an startet
    startSound.volume = 0.3;
    startSound
      .play()
      .catch((e) => console.log("Audio konnte nicht abgespielt werden:", e));
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName) {
      setShowWarning(true);
      return;
    }

    sendDifficultyToBackend(difficulty);
    handleCallNewRound();

    startingSound();

    navigate("/tutorial", {
      state: {
        playerName,
        difficulty,
        answerOption,
        selectedPowerUps: selected,
      },
    });
  };

  const randomName = () => {
    const first = names[Math.floor(Math.random() * names.length)];
    const last = surnames[Math.floor(Math.random() * surnames.length)];
    setPlayerName(first + last);
    setShowWarning(false);
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
          <div className="flex flex-col content-center gap-2 mb-4 ">
            {showWarning && (
              <p className="bg-red-600 p-2 rounded-md text-white text-sm text-center font-semibold">
                !Bitte generiere zuerst einen Namen!
              </p>
            )}
            {playerName ? (
              <p className="font-serif text-3xl italic text-sky-700">
                {playerName}
              </p>
            ) : (
              <p className="text-2xl mx-auto text-black/50 italic">
                "Platzhalter"
              </p>
            )}

            <SoundButton
              type="button"
              onClick={randomName}
              className="bg-zinc-900 text-white rounded-full py-2 px-4 font-black uppercase w-fit mx-auto hover:opacity-75"
            >
              Namen Generieren
            </SoundButton>
          </div>
          {/* Schwierigkeitsstufe */}
          <div className="my-2 w-full">
            <p className="subsubheader mb-2 w-full text-center">
              Schwierigkeitsstufe{" "}
            </p>

            <div className="mb-4 flex flex-col justify-center items-start w-full accent-black max-w-72 mx-auto">
              <InputSound
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
            <div className="flex justify-between w-98 mx-auto ">
              {["4x Zufällige", "2x Auswählen"].map((label) => (
                <label
                  key={label}
                  className="flex flex-col items-center gap-1 w-1/3 text-center"
                >
                  <InputSound
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
                      <SoundButton
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
                          ${isSelected ? "outline-2 outline-offset-2 outline-zinc-900" : ""}
                          ${isDisabled ? "opacity-25 cursor-not-allowed" : "opacity-80 hover:opacity-50 "}
                        `}
                        title={powerUp.label}
                      >
                        {powerUp.icon}
                      </SoundButton>
                      <span className="text-sm text-center">
                        {powerUp.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <SoundButton
            type="submit"
            className=" cursor-pointer italic mt-8 p-2 bg-zinc-900 text-white rounded-lg w-48 text-xl uppercase font-semibold"
          >
            {" "}
            Los Gehts!
          </SoundButton>
        </form>
      </div>
    </div>
  );
}
