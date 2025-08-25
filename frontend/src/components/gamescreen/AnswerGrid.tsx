import { useAnswerSound } from "../../hooks/useAnserSound";

interface PartyOption {
  short: string;
  full: string;
  img: string;
  color: string;
}

interface AnswerGridProps {
  options: PartyOption[];
  correctAnswer: string;
  selectedAnswer: string | null;
  showFeedback: boolean;
  handleAnswer: (optionShort: string) => void;
  disabledOptions?: string[];
}

const borderStyles = [
  "border-8 border-zinc-900 ring-8 ring-blue-500",
  "border-8 border-zinc-900 ring-8 ring-emerald-500",
  "border-8 border-zinc-900 ring-8 ring-rose-500",
  "border-8 border-zinc-900 ring-8 ring-yellow-500",
];

export default function AnswerGrid({
  options,
  correctAnswer,
  selectedAnswer,
  showFeedback,
  handleAnswer,
  disabledOptions = [],
}: AnswerGridProps) {
  const { play: playSound } = useAnswerSound();

  const onClickAnswer = (optionShort: string) => {
    if (selectedAnswer || disabledOptions.includes(optionShort)) return;

    const isCorrect = optionShort === correctAnswer;
    playSound(isCorrect);

    handleAnswer(optionShort);
  };

  return (
    <div className="h-1/2 w-full grid grid-rows-2 grid-cols-2 gap-6 p-6">
      {options.map((option, idx) => {
        const isCorrect = option.short === correctAnswer;
        const isSelected = selectedAnswer === option.short;
        const isDisabled =
          !!selectedAnswer || disabledOptions.includes(option.short);

        const base =
          "w-full h-full text-white font-bold flex flex-col justify-center items-center text-center rounded-sm";

        const bgColor = showFeedback
          ? isCorrect
            ? "bg-green-600"
            : isSelected
              ? "bg-red-600"
              : "bg-zinc-800"
          : "bg-zinc-800";

        return (
          <button
            type="button"
            key={idx}
            onClick={() => onClickAnswer(option.short)}
            disabled={isDisabled}
            className={`${base} ${bgColor} ${borderStyles[idx]} ${
              isDisabled ? "opacity-50 cursor-default" : ""
            }`}
          >
            <div
              className={`w-full h-full flex flex-row items-center gap-8 p-8 justify-between  ${
                isDisabled
                  ? "opacity-50 cursor-default"
                  : "cursor-pointer hover:bg-zinc-700"
              }`}
            >
              <div className="flex flex-col">
                <div className="text-4xl w-full text-start font-black">
                  {option.short}
                </div>
                <div className="text-base font-normal w-full text-start">
                  {option.full}
                </div>
              </div>
              <img
                src={option.img}
                alt={option.short}
                className="w-fit h-full mb-2 rounded-lg text-black items-center"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
