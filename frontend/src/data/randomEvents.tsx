export interface RandomEvent {
  id: string;
  text: string;
  color: string;
  chance: number; // z.B. 0.05 = 5%
  type: "preRound" | "postRound";
}
export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: "savingGrace",
    text: "Saving Grace, Glück gehabt!",
    color: "green",
    chance: 0.04,
    type: "postRound",
  },
  {
    id: "doublePoints",
    text: "Doppelte Punkte!",
    color: "yellow",
    chance: 0.05, // 0.05,
    type: "preRound",
  },
  {
    id: "skipWrong",
    text: "Eine Falsche Antwort Deaktiviert!",
    color: "blue",
    chance: 0.05, //.05,
    type: "preRound",
  },
];
