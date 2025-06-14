import { useState } from "react";
import { useNavigate } from "react-router-dom";

const powerUps = [
  { id: "doublePoints", color: "bg-red-500", label: "Doppelte" },
  { id: "extraTime", color: "bg-blue-500", label: "Extra Zeit" },
  { id: "skipQuestion", color: "bg-green-500", label: "Frage " },
  { id: "hint", color: "bg-yellow-400", label: "Hinweis" },
  { id: "doublePoints2", color: "bg-cyan-500", label: "Doppelte " },
  {
    id: "extraTime3",
    color: "bg-emerald-500",
    label: "Extra Zeit",
  },
  { id: "skipQuestion4", color: "bg-rose-500", label: "Frage " },
  { id: "hint5", color: "bg-indigo-400", label: "Hinweis" },
];

export default function StartPanel() {
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [answerOption, setAnswerOption] = useState("2x auswählen");
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleStart = () => {
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

  return (
    <div className="mt-8 flex flex-col gap-6">
      <h2 className="subheader">Spieleinstellungen</h2>

      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Kim Meier"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="mb-4 border-2 border-zinc-900 w-full p-2 focus:outline-2 focus:outline-white rounded-md max-w-72 mx-auto"
        />

        {/* Schwierigkeitsstufe */}
        <div className="my-2 w-full">
          <p className="subsubheader mb-2 w-full text-center">
            Schwierigkeitsstufe{" "}
          </p>
          <div className="flex justify-between">
            {["Einfach", "Medium", "Schwer"].map((label) => (
              <label
                key={label}
                className="flex flex-col items-center gap-1 w-1/3 text-center"
              >
                <input
                  type="radio"
                  name="difficulty"
                  checked={difficulty === label}
                  onChange={() => setDifficulty(label)}
                  className="size-6 accent-black"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Antwortoptionen */}
        <div className="my-2 w-full ">
          <p className="subsubheader mb-2 w-full text-center">
            Power-Ups auswählen
          </p>
          <div className="flex justify-between ">
            {["Keine", "2x auswählen", "4x zufällige"].map((label) => (
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
                    setSelected([]); // reset selection on change
                  }}
                  className="size-6 accent-black"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* PowerUps nur anzeigen, wenn "2x auswählen" */}
        {answerOption === "2x auswählen" && (
          <div className="flex flex-col w-full max-w-96 ">
            <p className="text-sm mx-auto mb-4">Wähle 2 Power-Ups aus!</p>
            <div className="grid grid-cols-4 gap-4 w-full place-items-center">
              {powerUps.map((powerUp) => {
                const isSelected = selected.includes(powerUp.id);
                const isDisabled = !isSelected && selected.length >= 2;
                return (
                  <div
                    key={powerUp.id}
                    className="flex flex-col items-center gap-1 "
                  >
                    <button
                      onClick={() => !isDisabled && toggleSelection(powerUp.id)}
                      disabled={isDisabled}
                      className={`aspect-square w-10 border border-zinc-800 rounded-md flex items-center justify-center font-semibold
                        ${powerUp.color}
                        ${isSelected ? "ring-4 ring-white" : "opacity-80 hover:opacity-100"}
                        ${isDisabled ? "opacity-25 cursor-not-allowed" : "cursor-pointer"}
                      `}
                    />
                    <span className="text-sm text-center">{powerUp.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <button
          onClick={handleStart}
          className=" cursor-pointer italic mt-4 p-2 bg-zinc-900 text-white rounded-lg w-48 text-xl uppercase font-semibold"
        >
          {" "}
          Los Gehts!
        </button>
      </div>
    </div>
  );
}
