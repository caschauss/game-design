export const PARTIES = {
  SPD: {
    full: "Sozialdemokratische Partei Deutschlands",
    img: "/logos/spd.png",
    color: "bg-red-600",
  },
  CDU: {
    full: "Christlich Demokratische Union",
    img: "/logos/cdu.png",
    color: "bg-gray-800",
  },
  FDP: {
    full: "Freie Demokratische Partei",
    img: "/logos/fdp.png",
    color: "bg-yellow-400",
  },
  AfD: {
    full: "Alternative für Deutschland",
    img: "/logos/afd.png",
    color: "bg-red-700",
  },
  FW: { full: "Freie Wähler", img: "/logos/fw.png", color: "bg-orange-500" },
  GRÜNE: {
    full: "Bündnis 90 die Grünen",
    img: "/logos/gruene.png",
    color: "bg-green-700",
  },
  BSW: {
    full: "Bündnis Sarah Wagenknecht",
    img: "/logos/bsw.png",
    color: "bg-indigo-700",
  },
} as const;

export const powerUps = [
  {
    id: "showYear",
    color: "bg-blue-600",
    label: "Jahr",
    short: "JH", // Jahr
  },
  {
    id: "showPolitician",
    color: "bg-green-600",
    label: "Politiker",
    short: "PO", // Politiker
  },
  {
    id: "showContext",
    color: "bg-yellow-500",
    label: "Kontext",
    short: "KO", // Kontext
  },
  {
    id: "removeFalse",
    color: "bg-red-500",
    label: "−2 Falsch",
    short: "-2", // Falsch 2
  },
  {
    id: "doublePoints",
    color: "bg-pink-600",
    label: "2× Punkte",
    short: "2X", // 2x Punkte
  },
  {
    id: "timeFreeze",
    color: "bg-cyan-500",
    label: "+10s",
    short: "TF", // Time Freeze
  },
];
