import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GameHeader from "../components/gamescreen/GameHeader";
import AnswerGrid from "../components/gamescreen/AnswerGrid";
import RandomEffectOverlay from "../components/gamescreen/RandomEffectOverlay";
import { getRoundInformation, handleCallNewRound } from "../api/quizAPI";
import { PARTIES } from "../data/data";
import { useRandomEvents } from "../hooks/useRandomEvents";

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
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lives, setLives] = useState(3);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const [selectedPowerUps, setSelectedPowerUps] = useState<string[]>(
    state.selectedPowerUps || [],
  );
  const [usedPowerUps, setUsedPowerUps] = useState<string[]>(
    state.usedPowerUps || [],
  );
  const [chosenPowerUp, setChosenPowerUp] = useState<string | null>(null);

  const [currentRoundTimeLeft, setCurrentRoundTimeLeft] = useState(0);

  const { activeEvent, setActiveEvent, triggerRandomEvent } = useRandomEvents();

  // Neue Runde laden
  useEffect(() => {
    async function fetchNewRound() {
      setQuestionData(null);
      const data = await getRoundInformation();
      const round = data.roundInformation;
      if (!round) return;

      const event = triggerRandomEvent("preRound");
      if (event && event.type === "preRound") {
        console.log("Pre-Round Event:", event.id);
        setActiveEvent(event); // Overlay sichtbar
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
      setDisabledOptions([]);
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
      const wrongOptions = questionData.options.filter(
        (opt) => opt.short !== questionData.correct,
      );
      const toDisable = wrongOptions
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map((opt) => opt.short);
      setDisabledOptions(toDisable);
    }
  };

  useEffect(() => {
    if (activeEvent?.id === "skipWrong" && questionData) {
      const wrongOptions = questionData.options.filter(
        (opt) => opt.short !== questionData.correct,
      );
      const toDisable = wrongOptions
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)
        .map((opt) => opt.short);
      setDisabledOptions(toDisable);
    }
  }, [activeEvent, questionData]);

  const handleAnswer = async (short: string) => {
    if (hasAnswered || selectedAnswer || showFeedback || !questionData) return;

    setHasAnswered(true);
    setSelectedAnswer(short);
    setShowFeedback(true);

    const isCorrect = short === questionData.correct;
    let newScore = score;

    if (isCorrect) {
      // Punkte berechnen
      let basePoints = 1000;
      const timeBonus = currentRoundTimeLeft * 100;
      basePoints *= selectedPowerUps.length > 0 ? 0.15 : 1.15;
      newScore += basePoints + timeBonus;
      setScore(newScore);

      setTimeout(async () => {
        if ((currentRound + 1) % 5 === 0 && lives < 3)
          setLives((prev) => Math.min(prev + 1, 3));

        await handleCallNewRound();
        setSelectedAnswer(null);
        setShowFeedback(false);
        setCurrentRound((prev) => prev + 1);
      }, 3000);

      return;
    }

    // Falsche Antwort
    if (lives === 1) {
      const event = triggerRandomEvent("postRound");
      if (event?.id === "savingGrace") {
        setActiveEvent(event); // Overlay sichtbar
        console.log("Saving Grace rettet dich!");
        // Leben bleibt 1, Runde wird verzögert
        setTimeout(async () => {
          // Runde normal weiterschalten, Leben bleibt 1
          await handleCallNewRound();
          setSelectedAnswer(null);
          setShowFeedback(false);
          setCurrentRound((prev) => prev + 1);
        }, 3000);
        return; // wichtig, dass wir hier abbrechen, sonst wird Leben trotzdem abgezogen
      }
    }

    // Normales Leben abziehen
    setLives((prev) => prev - 1);
    setTimeout(async () => {
      const lifeAfter = lives - 1;
      if (lifeAfter <= 0) {
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
    }, 3000);
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
