import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RuleStep from "../components/tutorial/RuleStep";
import CountdownOverlay from "../components/tutorial/CountdownOverlay";

const rules = [
  {
    img: "/images/Idea.jpg",
    title: "Spielidee",
    shortDescription: "Ordne politische Aussagen den richtigen Parteien zu.",
    points: [
      "Jede richtige Antwort bringt Punkte.",
      "Jeder Fehler kostet ein Leben.",
      "Ziel: Highscore knacken und politische Inhalte besser verstehen.",
    ],
  },
  {
    img: "/images/ScoreBoard.jpg",
    title: "Punktesystem",
    shortDescription: "Sammle möglichst viele Punkte und nutze Power-Ups.",
    points: [
      "Basis: 1000 Punkte pro richtiger Antwort.",
      "Ohne Power-Ups: +15% Punktebonus.",
      "Mit Power-Ups: -15% Punkteabzug.",
      "Zeitbonus: +100 Punkte pro verbleibender Sekunde.",
      "Schwierigere Level bringen mehr Punkte.",
      "2% Chance auf doppelte Punkte pro Runde.",
    ],
  },
  {
    img: "/images/GameSession.png",
    title: "Rundenablauf",
    shortDescription:
      "Beantworte Aussagen innerhalb des Timers und nutze Power-Ups klug.",
    points: [
      "1 Aussage, 4 Antwortfelder pro Runde.",
      "30 Sekunden Zeit, Signal bei 15s Restzeit.",
      "Power-Ups: Fifty-Fifty, Doppelte Punkte, Zeit +10s, Zusatzinfos.",
      "Bonusleben nach 5 richtigen Antworten in Folge.",
    ],
  },
  {
    img: "/images/Idea2.jpg",
    title: "Besondere Effekte",
    shortDescription:
      "Seltene Random Effekte können den Spielverlauf verändern.",
    points: [
      "Saving Grace: Überlebe den Verlust des letzten Lebens.",
      "Doppelte Punkte: Diese Runde zählt doppelt.",
      "Antwortblock: Eine falsche Option wird blockiert.",
      "Quellenübersicht für jede Aussage einblendbar.",
    ],
  },
];
const corners = ["topLeft", "topRight", "bottomLeft", "bottomRight"] as const;

type AnimatingRule = {
  img: string;
  title: string;
  shortDescription: string;
  points: string[];
  corner: (typeof corners)[number];
  isAnimating: boolean;
  id: number;
};

const TutorialScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatingRules, setAnimatingRules] = useState<AnimatingRule[]>([]);
  const [showCountdown, setShowCountdown] = useState(false);
  const location = useLocation();
  const { playerName, difficulty, answerOption, selectedPowerUps } =
    location.state || {};

  useEffect(() => {
    if (activeIndex >= rules.length) {
      // Last animation finished, show countdown
      setShowCountdown(true);
      return;
    }

    const newRule: AnimatingRule = {
      ...rules[activeIndex],
      corner: corners[activeIndex],
      isAnimating: false,
      id: activeIndex,
    };

    setAnimatingRules((prev) => [...prev, newRule]);

    const animateTimer = setTimeout(() => {
      setAnimatingRules((prev) =>
        prev.map((rule) =>
          rule.id === activeIndex ? { ...rule, isAnimating: true } : rule,
        ),
      );
    }, 1500);

    const nextTimer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, 2500);

    return () => {
      clearTimeout(animateTimer);
      clearTimeout(nextTimer);
    };
  }, [activeIndex]);

  return (
    <div className="relative h-screen bg-zinc-900 text-white overflow-hidden">
      {animatingRules.map((rule, idx) => (
        <RuleStep
          key={idx}
          image={rule.img}
          title={rule.title}
          shortDescription={rule.shortDescription}
          points={rule.points}
          corner={rule.corner}
          isAnimating={rule.isAnimating}
        />
      ))}

      {showCountdown && (
        <CountdownOverlay
          startAfter={1000}
          startNumber={9}
          onComplete={() =>
            navigate("/game", {
              state: { playerName, difficulty, answerOption, selectedPowerUps },
            })
          }
        />
      )}
    </div>
  );
};

export default TutorialScreen;
