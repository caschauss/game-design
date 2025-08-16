import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RuleStep from "../components/tutorial/RuleStep";
import CountdownOverlay from "../components/tutorial/CountdownOverlay";

const rules = [
  {
    img: "/images/GameSession.png",
    text: "Idee: Politische Aussagen den richtigen Parteien zuordnen – schnell, strategisch und im Team. Jede richtige Antwort bringt Punkte, jeder Fehler kostet Leben. Ziel: möglichst viele Punkte sammeln, Highscore knacken und politische Inhalte besser verstehen.",
  },
  {
    img: "/images/GameSession.png",
    text: "Punkte: Basis 1000 Punkte (Power-Ups -15%, ohne +15%). Zeitbonus: +100 Punkte pro Sekunde Restzeit. Schwierigkeitsgrad: höhere Level bringen mehr Punkte. Power-Ups: ohne +15%, mit -15%. Zufallseffekt: 2% Chance auf doppelte Punkte.",
  },
  {
    img: "/images/GameSession.png",
    text: "Runde: Aufbau 1 Aussage, 4 Felder. Zeit pro Aussage: 30s Timer, Rassel bei 15s. Power-Ups: Fifty-Fifty, Doppelte Punkte, Zeit +10s, Zusatzinfos. Rundenlänge: 3 Leben (Bonus nach 5er Streak).",
  },
  {
    img: "/images/GameSession.png",
    text: "Besondere Effekte: Saving Grace (1%): Überlebe Verlust letzten Lebens. Doppelte Punkte (2%): Diese Runde gibt doppelt so viel. Verdeckte Antwort (5%): Blockt eine falsche Möglichkeit. Quellenübersicht anzeigen.",
  },
];
const corners = ["topLeft", "topRight", "bottomLeft", "bottomRight"] as const;

type AnimatingRule = {
  img: string;
  text: string;
  corner: (typeof corners)[number];
  isAnimating: boolean;
  id: number;
};

const TutorialScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatingRules, setAnimatingRules] = useState<AnimatingRule[]>([]);
  const [showCountdown, setShowCountdown] = useState(false);

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
      {animatingRules.map((rule) => (
        <RuleStep
          key={rule.id}
          image={rule.img}
          text={rule.text}
          corner={rule.corner}
          isAnimating={rule.isAnimating}
        />
      ))}

      {showCountdown && (
        <CountdownOverlay
          startAfter={500}
          startNumber={10}
          onComplete={() => navigate("/game")}
        />
      )}
    </div>
  );
};

export default TutorialScreen;
