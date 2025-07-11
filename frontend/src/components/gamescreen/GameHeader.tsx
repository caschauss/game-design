import ScoreRoundDisplay from "./gameheadercomponents/ScoreRoundDisplay";
import QuestionDisplay from "./gameheadercomponents/QuestionDislpay";
import PowerUpsSelector from "./gameheadercomponents/PowerUpsSelector";
import CountdownBar from "./CountdownBar";

interface GameHeaderProps {
  playerName: string;
  selectedPowerUps: string[];
  usedPowerUps: string[];
  chosenPowerUp: string | null;
  onChoosePowerUp: (id: string) => void;
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
  showFeedback: boolean;
}

export default function GameHeader({
  selectedPowerUps,
  usedPowerUps,
  chosenPowerUp,
  onChoosePowerUp,
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
  showFeedback,
}: GameHeaderProps) {
  const showAuthor = chosenPowerUp === "showPolitician" || showFeedback;
  const showDate = chosenPowerUp === "showYear" || showFeedback;
  const showContext = chosenPowerUp === "showContext" || showFeedback;
  const showDoublePoints = chosenPowerUp === "doublePoints";

  const isFromPowerup = (type: string) => chosenPowerUp === type;

  // Kein lokalen State für chosenPowerUp oder usedPowerUps

  return (
    <div className="h-1/2 w-full flex flex-col justify-between">
      <div className="w-full h-full flex justify-between gap-4 px-8">
        <PowerUpsSelector
          selectedPowerUps={selectedPowerUps}
          chosenPowerUp={chosenPowerUp}
          usedPowerUps={usedPowerUps}
          onChoosePowerUp={onChoosePowerUp} // direkt von Parent kommen lassen
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
          isFromPowerUp={isFromPowerup}
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
          powerups={chosenPowerUp ?? ""}
        />
      </div>
    </div>
  );
}
