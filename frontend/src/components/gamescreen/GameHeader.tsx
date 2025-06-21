import { useState, useEffect } from "react";
import ScoreRoundDisplay from "./gameheadercomponents/ScoreRoundDisplay";
import QuestionDisplay from "./gameheadercomponents/QuestionDislpay";
import PowerUpsSelector from "./gameheadercomponents/PowerUpsSelector";
import CountdownBar from "./CountdownBar";

interface GameHeaderProps {
  playerName: string;
  selectedPowerUps: string[];
  question: string;
  author: string;
  context: string;
  date: number;
  source: string;
  score: number;
  round: number;
  lives: number;
  onTimeUp: () => void;
  onTimeUpdate: (timeLeft: number) => void;
}

export default function GameHeader(props: GameHeaderProps) {
  const {
    selectedPowerUps,
    question,
    author,
    context,
    date,
    source,
    score,
    round,
    lives,
    onTimeUp,
    onTimeUpdate,
  } = props;

  const [chosenPowerUp, setChosenPowerUp] = useState<string | null>(null);
  const [usedPowerUps, setUsedPowerUps] = useState<string[]>([]);

  const showAuthor = chosenPowerUp === "showPolitician";
  const showDate = chosenPowerUp === "showYear";
  const showContext = chosenPowerUp === "showContext";
  const showDoublePoints = chosenPowerUp === "doublePoints";

  useEffect(() => {
    setChosenPowerUp(null);
  }, [round]);

  function handleChoosePowerUp(id: string) {
    setChosenPowerUp(id);
    setUsedPowerUps((prev) => [...prev, id]);
  }

  return (
    <div className="h-1/2 w-full flex flex-col justify-between">
      <div className="w-full h-full flex justify-between gap-4 px-8">
        <PowerUpsSelector
          selectedPowerUps={selectedPowerUps}
          chosenPowerUp={chosenPowerUp}
          usedPowerUps={usedPowerUps}
          onChoosePowerUp={handleChoosePowerUp}
        />
        <QuestionDisplay
          question={question}
          author={author}
          context={context}
          date={date}
          source={source}
          showAuthor={showAuthor}
          showDate={showDate}
          showContext={showContext}
        />
        <ScoreRoundDisplay
          score={score}
          round={round}
          lives={lives}
          showDoublePoints={showDoublePoints}
        />
      </div>

      <div className="w-full px-8 mt-4">
        <CountdownBar
          duration={30}
          onComplete={onTimeUp}
          onTimeUpdate={onTimeUpdate}
          powerups={chosenPowerUp ? chosenPowerUp : ""}
        />
      </div>
    </div>
  );
}
