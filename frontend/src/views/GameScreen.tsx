import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GameHeader from "../components/gamescreen/GameHeader";
import AnswerGrid from "../components/gamescreen/AnswerGrid";
import RandomEffectOverlay from "../components/gamescreen/RandomEffectOverlay";
import { getRoundInformation, handleCallNewRound } from "../api/quizAPI";
import { PARTIES } from "../data/data";
import { useRandomEvents } from "../hooks/useRandomEvents";
import { useDisabledOptions } from "../hooks/useDisabledOptions";
import { useScore } from "../hooks/useScore";

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
  context: string;
  date: number;
  difficulty: number;
  source: string;
  name: string;
  options: PartyOption[];
}

export default function GameScreen() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state: {
      playerName: string;
      difficulty: string;
      answerOption: string;
      selectedPowerUps: string[];
      usedPowerUps: string[];
    };
  };

  const [currentRound, setCurrentRound] = useState(0);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lives, setLives] = useState(3);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedPowerUps, setSelectedPowerUps] = useState<string[]>(
    state.selectedPowerUps || [],
  );
  const [usedPowerUps, setUsedPowerUps] = useState<string[]>(
    state.usedPowerUps || [],
  );
  const [chosenPowerUp, setChosenPowerUp] = useState<string | null>(null);
  const [currentRoundTimeLeft, setCurrentRoundTimeLeft] = useState(0);
  const { activeEvent, setActiveEvent, triggerRandomEvent } = useRandomEvents();
  const { disabledOptions, applyFiftyFifty, applySkipWrong, resetDisabled } =
    useDisabledOptions();
  const { score, addScore } = useScore({ initialScore: 0 });
  const [eventMultiplier, setEventMultiplier] = useState(1);

  // Neue Runde laden
  useEffect(() => {
    async function fetchNewRound() {
      setEventMultiplier(1);
      setQuestionData(null);
      const data = await getRoundInformation();
      const round = data.roundInformation;
      if (!round) return;

      const event = triggerRandomEvent("preRound");
      if (event && event.type === "preRound") {
        setActiveEvent(event); // Overlay sichtbar
        if (event?.id === "doublePoints") {
          setEventMultiplier(2);
          console.log(eventMultiplier);
        } else {
          setEventMultiplier(1);
          console.log(eventMultiplier);
        }
      }

      if (round?.party === "FINISHED") {
        navigate("/result", {
          state: {
            playerName: state.playerName,
            score,
            total: currentRound,
            selectedPowerUps,
            usedPowerUps,
          },
        });
        return;
      }

      const correctKey = round.party as PartyKey;
      if (!correctKey || !PARTIES[correctKey]) return;

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
        context: round.context,
        date: round.date,
        difficulty: round.difficulty,
        source: round.link,
        name: round.name,
        options,
      });

      setCurrentRoundTimeLeft(30);
      setHasAnswered(false);
      setChosenPowerUp(null);
      resetDisabled();
    }

    fetchNewRound();
  }, [currentRound]);

  const handleTimeUpdate = (timeLeft: number) =>
    setCurrentRoundTimeLeft(timeLeft);

  const activatePowerUp = (id: string) => {
    if (!selectedPowerUps.includes(id)) return;
    setSelectedPowerUps((prev) => prev.filter((p) => p !== id));
    setUsedPowerUps((prev) => [...prev, id]);
    setChosenPowerUp(id);

    if (id === "fiftyfifty" && questionData) {
      applyFiftyFifty({
        correct: questionData.correct,
        options: questionData.options,
      });
    }
  };

  useEffect(() => {
    if (activeEvent?.id === "skipWrong" && questionData) {
      applySkipWrong({
        correct: questionData.correct,
        options: questionData.options,
      });
    }
  }, [activeEvent, questionData]);

  const handleAnswer = async (short: string) => {
    if (hasAnswered || selectedAnswer || showFeedback || !questionData) return;

    setHasAnswered(true);
    setSelectedAnswer(short);
    setShowFeedback(true);

    const isCorrect = short === questionData.correct;

    if (isCorrect) {
      const isDoublePointsRound = chosenPowerUp === "doublePoints";
      const hasAnyPowerUps =
        selectedPowerUps.length > 0 || usedPowerUps.length > 0;

      addScore(
        currentRoundTimeLeft,
        1000, // Basiswert
        questionData.difficulty,
        hasAnyPowerUps, // genereller Malus
        isDoublePointsRound, // PowerUp aktiv diese Runde?
        eventMultiplier, // Event-Multiplikator
      );

      setTimeout(async () => {
        if ((currentRound + 1) % 5 === 0 && lives < 3)
          setLives((prev) => Math.min(prev + 1, 3));

        await handleCallNewRound();
        setSelectedAnswer(null);
        setShowFeedback(false);
        setCurrentRound((prev) => prev + 1);
      }, 4000);

      return;
    }

    // Falsche Antwort
    if (lives === 1) {
      const event = triggerRandomEvent("postRound");
      if (event?.id === "savingGrace") {
        setActiveEvent(event); // Overlay sichtbar
        setTimeout(async () => {
          await handleCallNewRound();
          setSelectedAnswer(null);
          setShowFeedback(false);
          setCurrentRound((prev) => prev + 1);
        }, 4000);
        return;
      }
    }

    setLives((prev) => prev - 1);
    setTimeout(async () => {
      if (lives - 1 <= 0) {
        navigate("/result", {
          state: {
            playerName: state.playerName,
            score,
            total: currentRound + 1,
            selectedPowerUps,
          },
        });
      } else {
        await handleCallNewRound();
        setSelectedAnswer(null);
        setShowFeedback(false);
        setCurrentRound((prev) => prev + 1);
      }
    }, 4000);
  };

  if (!questionData)
    return <div className="p-8 text-white">Lade Zitate...</div>;

  return (
    <div className="pt-12 h-full text-white relative">
      {activeEvent && (
        <RandomEffectOverlay
          text={activeEvent.text}
          color={activeEvent.color}
        />
      )}

      <GameHeader
        playerName={state.playerName}
        selectedPowerUps={selectedPowerUps}
        usedPowerUps={usedPowerUps}
        chosenPowerUp={chosenPowerUp}
        onChoosePowerUp={activatePowerUp}
        question={questionData.quote}
        author={questionData.name}
        context={questionData.context}
        date={questionData.date}
        source={questionData.source}
        score={score}
        round={currentRound + 1}
        lives={lives}
        onTimeUp={() => handleAnswer("wrong")}
        onTimeUpdate={handleTimeUpdate}
        showFeedback={showFeedback}
        eventMultiplier={eventMultiplier}
      />

      <AnswerGrid
        options={questionData.options}
        correctAnswer={questionData.correct}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        handleAnswer={handleAnswer}
        disabledOptions={disabledOptions}
      />
    </div>
  );
}
