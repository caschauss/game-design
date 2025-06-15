import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GameHeader from "../components/gamescreen/GameHeader";
import AnswerGrid from "../components/gamescreen/AnswerGrid";
import { getRoundInformation, handleCallNewRound } from "../api/quizAPI";
import { PARTIES } from "../data/data";

type PartyKey = keyof typeof PARTIES;

interface PartyOption {
  short: PartyKey;
  full: string;
  img: string;
  color: string;
}

interface QuestionData {
  quote: string;
  correct: string;
  options: PartyOption[];
}

export default function GameScreen() {
  const navigate = useNavigate();

  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);

  const { state } = useLocation() as {
    state: {
      playerName: string;
      difficulty: string;
      answerOption: string;
      selectedPowerUps: string[];
    };
  };

  // Fetch new round data whenever currentRound changes
  useEffect(() => {
    async function fetchNewRound() {
      const data = await getRoundInformation();
      const round = data.roundInformation;

      console.log("Loaded round info:", round);

      const correctKey = round.party as PartyKey;

      if (!correctKey || !PARTIES[correctKey]) {
        console.warn("Unknown or missing party key:", correctKey);
        return;
      }

      const otherKeys = Object.keys(PARTIES).filter((k) => k !== correctKey);
      const shuffled = otherKeys.sort(() => 0.5 - Math.random()).slice(0, 3);
      const allOptionKeys = [correctKey, ...shuffled].sort(
        () => 0.5 - Math.random(),
      );

      const options = allOptionKeys.map((key) => ({
        short: key as PartyKey,
        full: PARTIES[key as PartyKey].full,
        img: PARTIES[key as PartyKey].img,
        color: PARTIES[key as PartyKey].color,
      }));

      setQuestionData({
        quote: round.expression,
        correct: correctKey,
        options,
      });
    }

    fetchNewRound();
  }, [currentRound]);

  const handleAnswer = async (short: string) => {
    if (selectedAnswer || showFeedback || !questionData) return;

    setSelectedAnswer(short);
    setShowFeedback(true);

    const isCorrect = short === questionData.correct;

    if (isCorrect) {
      setScore((prev) => prev + 1);

      setTimeout(async () => {
        await handleCallNewRound(); // Prepare backend for next round
        setSelectedAnswer(null);
        setShowFeedback(false);
        setCurrentRound((prev) => prev + 1); // Trigger next round fetch via useEffect
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/result", {
          state: {
            playerName: state.playerName,
            score,
            total: score + 1,
            selectedPowerUps: state.selectedPowerUps,
          },
        });
      }, 1000);
    }
  };

  if (!questionData) {
    return <div className="p-8 text-white">Lade Zitate...</div>;
  }

  return (
    <div className="pt-12 h-full text-white">
      <GameHeader
        playerName={state.playerName}
        selectedPowerUps={state.selectedPowerUps}
        question={questionData.quote}
        score={score}
        round={currentRound + 1}
        onTimeUp={() => handleAnswer("wrong")}
      />
      <AnswerGrid
        options={questionData.options}
        correctAnswer={questionData.correct}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
