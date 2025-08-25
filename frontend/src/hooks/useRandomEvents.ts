import { useState } from "react";
import { RANDOM_EVENTS } from "../data/randomEvents";

export interface RandomEvent {
  id: string;
  text: string;
  color: string;
  type: "preRound" | "postRound";
  chance: number;
}

export const useRandomEvents = () => {
  const [activeEvent, setActiveEvent] = useState<RandomEvent | null>(null);

  const triggerRandomEvent = (
    type: "preRound" | "postRound",
  ): RandomEvent | null => {
    const possibleEvents = RANDOM_EVENTS.filter((e) => e.type === type);

    const rand = Math.random(); // Zufallszahl zwischen 0 und 1
    let cumulative = 0;

    for (const event of possibleEvents) {
      cumulative += event.chance;
      if (rand < cumulative) {
        setActiveEvent(event);
        setTimeout(() => setActiveEvent(null), 2500);
        return event;
      }
    }

    // Falls rand größer als Summe der Chancen (kann nur passieren, wenn keine "none" definiert ist)
    return null;
  };

  return { activeEvent, setActiveEvent, triggerRandomEvent };
};
