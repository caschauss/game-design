import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GameHeader from "../components/gamescreen/GameHeader";
import AnswerGrid from "../components/gamescreen/AnswerGrid";

const allQuestions = [
  {
    id: 1,
    quote: "Niemand hat die Absicht, eine Mauer zu errichten.",
    options: [
      {
        short: "SED",
        full: "Sozialistische Einheitspartei Deutschlands",
        img: "/logos/sed.png",
        color: "bg-red-700", // SED red tone
      },
      {
        short: "CDU",
        full: "Christlich Demokratische Union",
        img: "/logos/cdu.png",
        color: "bg-gray-800", // CDU dark gray
      },
      {
        short: "SPD",
        full: "Sozialdemokratische Partei Deutschlands",
        img: "/logos/spd.png",
        color: "bg-red-600", // SPD red
      },
      {
        short: "FDP",
        full: "Freie Demokratische Partei",
        img: "/logos/fdp.png",
        color: "bg-yellow-400", // FDP yellow
      },
    ],
    correct: "SED",
  },
  // Add more political quotes with 4 parties each
];
export default function GameScreen() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentRound];

  const { state } = useLocation() as {
    state: {
      playerName: string;
      difficulty: string;
      answerOption: string;
      selectedPowerUps: string[];
    };
  };

  function getRandomQuestions(all: any[], count: number) {
    return all.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  useEffect(() => {
    const randomized = getRandomQuestions(allQuestions, 10);
    setQuestions(randomized);
  }, []);

  const handleAnswer = (short: string) => {
    if (selectedAnswer || showFeedback) return;
    setSelectedAnswer(short);
    setShowFeedback(true);

    if (short === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);
      if (currentRound < 9) {
        setCurrentRound((prev) => prev + 1);
      } else {
        navigate("/result", {
          state: {
            playerName: state.playerName,
            score,
            total: 10,
          },
        });
      }
    }, 1000);
  };

  if (!currentQuestion)
    return <div className="p-8 text-white">Lade Zitate...</div>;

  return (
    <div className="pt-12 h-full text-white">
      <GameHeader
        playerName={state.playerName}
        selectedPowerUps={state.selectedPowerUps}
        question={currentQuestion.quote}
        score={score}
        round={currentRound + 1}
        onTimeUp={() => handleAnswer("wrong")}
      />
      <AnswerGrid
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correct}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}
