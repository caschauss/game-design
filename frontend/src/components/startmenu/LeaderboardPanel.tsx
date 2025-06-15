import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { powerUps } from "../../data/data";

type LeaderboardEntry = {
  rank: number | null; // null if not ranked
  name: string;
  score: number;
  date: string;
  powerUps: string[]; // 2-letter codes like ["DB", "EX"]
};

type PowerUp = {
  id: string;
  color: string;
  label: string;
  short: string;
};

const powerUpMeta = Object.fromEntries(
  powerUps.map((pu: PowerUp) => [
    pu.short,
    {
      color: pu.color, // Keep full Tailwind class like "bg-pink-600"
      label: pu.label, // Optional: Use .label instead of .short for tooltip
      short: pu.short,
    },
  ]),
);

// Dummy data for testing
const initialData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Anna",
    score: 980,
    date: "2025-06-01",
    powerUps: ["2X", "TF"],
  },
  {
    rank: 2,
    name: "Ben",
    score: 940,
    date: "2025-06-03",
    powerUps: ["JH", "KO"],
  },
  {
    rank: 3,
    name: "Clara",
    score: 910,
    date: "2025-06-02",
    powerUps: ["PO"],
  },
  {
    rank: 4,
    name: "David",
    score: 890,
    date: "2025-06-05",
    powerUps: [],
  },
  {
    rank: 5,
    name: "Ella",
    score: 870,
    date: "2025-06-04",
    powerUps: ["TF", "JH", "2X", "KO"],
  },
  {
    rank: 6,
    name: "Felix",
    score: 860,
    date: "2025-06-06",
    powerUps: [],
  },
  {
    rank: 7,
    name: "Greta",
    score: 845,
    date: "2025-06-07",
    powerUps: ["-2"],
  },
  {
    rank: 8,
    name: "Henry",
    score: 830,
    date: "2025-06-08",
    powerUps: [],
  },
  {
    rank: 9,
    name: "Ida",
    score: 820,
    date: "2025-06-09",
    powerUps: [],
  },
  {
    rank: 10,
    name: "Jonas",
    score: 810,
    date: "2025-06-10",
    powerUps: [],
  },
];

export default function LeaderboardPanel() {
  const location = useLocation();
  const newResult = location.state as {
    playerName?: string;
    score?: number;
    date?: string;
    selectedPowerUps?: string[];
  };

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [newEntry, setNewEntry] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    const updated = [...initialData];

    if (newResult?.playerName && newResult.score && newResult.date) {
      const entry: LeaderboardEntry = {
        name: newResult.playerName,
        score: Math.round(newResult.score),
        date: newResult.date,
        powerUps: newResult.selectedPowerUps ?? [],
        rank: null,
      };

      updated.push(entry);

      // Sort and rank
      updated.sort((a, b) => b.score - a.score);
      const ranked = updated.map((e, i) => ({
        ...e,
        rank: i < 10 ? i + 1 : null,
      }));

      const top10 = ranked.filter((e) => e.rank !== null);
      const below10 =
        ranked.find((e) => e.name === entry.name && e.rank === null) || null;

      setLeaderboard(top10);
      setNewEntry(below10); // will be null if in top 10
    }
  }, [newResult]);

  return (
    <div className="mt-8 flex flex-col gap-6 h-full w-full px-8 text-black">
      <h2 className="subheader text-center text-3xl font-bold">Leaderboards</h2>
      <div className="overflow-x-auto">
        <table className="w-full rounded-lg shadow-md">
          <thead className="bg-zinc-900 text-left text-white">
            <tr>
              <th className="p-3">Platz</th>
              <th className="p-3">Name</th>
              <th className="p-3">Punkte</th>
              <th className="p-3">Datum</th>
              <th className="p-3">Power-Ups</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr
                key={`${entry.rank}-${entry.name}`}
                className="even:bg-zinc-900/15"
              >
                <td className="p-3 font-semibold">{entry.rank}</td>
                <td className="p-3">{entry.name}</td>
                <td className="p-3">{entry.score}</td>
                <td className="p-3">{entry.date}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    {entry.powerUps.map((code) => (
                      <div
                        key={code}
                        className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center text-white ${
                          powerUpMeta[code]?.color ?? "bg-gray-500"
                        }`}
                        title={powerUpMeta[code]?.short}
                      >
                        {powerUpMeta[code]?.short}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {newEntry && (
              <tr className="bg-yellow-200/30 border-t border-yellow-400">
                <td className="p-3 font-semibold">–</td>
                <td className="p-3">{newEntry.name}</td>
                <td className="p-3">{newEntry.score}</td>
                <td className="p-3">{newEntry.date}</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    {newEntry.powerUps.map((code) => (
                      <div
                        key={code}
                        className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center text-white ${
                          powerUpMeta[code]?.color ?? "bg-gray-500"
                        }`}
                        title={powerUpMeta[code]?.short}
                      >
                        {powerUpMeta[code]?.short}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
