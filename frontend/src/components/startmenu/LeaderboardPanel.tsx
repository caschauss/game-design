import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { powerUps } from "../../data/data"; // Assuming this path is correct

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
    name: "Max Mustermann",
    score: 12500,
    date: "2025-06-14",
    powerUps: ["2X", "TF"],
  },
  {
    rank: 2,
    name: "Erika Musterfrau",
    score: 12300,
    date: "2025-06-13",
    powerUps: ["JH", "KO"],
  },
  {
    rank: 3,
    name: "Lukas Schmidt",
    score: 12100,
    date: "2025-06-12",
    powerUps: ["PO"],
  },
  {
    rank: 4,
    name: "Sophie Mayer",
    score: 11900,
    date: "2025-06-11",
    powerUps: [],
  },
  {
    rank: 5,
    name: "Tim Fischer",
    score: 11700,
    date: "2025-06-10",
    powerUps: ["TF", "JH", "2X", "KO"],
  },
  {
    rank: 6,
    name: "Lena Wagner",
    score: 11500,
    date: "2025-06-09",
    powerUps: [],
  },
  {
    rank: 7,
    name: "Tom Becker",
    score: 11300,
    date: "2025-06-08",
    powerUps: ["-2"],
  },
  {
    rank: 8,
    name: "Mia Neumann",
    score: 11100,
    date: "2025-06-07",
    powerUps: [],
  },
  {
    rank: 9,
    name: "Paul Richter",
    score: 10900,
    date: "2025-06-06",
    powerUps: [],
  },
  {
    rank: 10,
    name: "Emma Klein",
    score: 10700,
    date: "2025-06-05",
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

  // Store the name of the new player to highlight their entry
  const [highlightPlayerName, setHighlightPlayerName] = useState<string | null>(
    null,
  );

  useEffect(() => {
    // If a new result exists and doesn't have a date, generate one (current date)
    // This ensures consistency. You might prefer to pass the date from the game screen.
    if (newResult?.playerName && newResult.score && !newResult.date) {
      newResult.date = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
    }

    const updated = [...initialData]; // Start with initial data

    let currentPlayerEntry: LeaderboardEntry | null = null;

    if (newResult?.playerName && newResult.score && newResult.date) {
      currentPlayerEntry = {
        name: newResult.playerName,
        score: Math.round(newResult.score),
        date: newResult.date,
        powerUps: newResult.selectedPowerUps ?? [],
        rank: null, // Temporarily null, will be assigned during ranking
      };

      updated.push(currentPlayerEntry); // Add the new player's entry
      setHighlightPlayerName(currentPlayerEntry.name); // Set player name for highlighting
    }

    // Sort all entries (including the new one if present)
    updated.sort((a, b) => b.score - a.score);

    // Assign ranks and filter for top 10
    const ranked = updated.map((e, i) => ({
      ...e,
      rank: i < 10 ? i + 1 : null,
    }));

    const top10 = ranked.filter((e) => e.rank !== null);

    // Check if the current player's entry made it into the top 10
    const currentEntryInTop10 = currentPlayerEntry
      ? top10.find(
          (e) =>
            e.name === currentPlayerEntry!.name &&
            e.score === currentPlayerEntry!.score,
        )
      : null;

    if (currentEntryInTop10) {
      // If the current player is in the top 10, no need for the separate 'newEntry' row
      setNewEntry(null);
    } else {
      // If the current player is NOT in the top 10, find their entry to display below
      const entryBelow10 = currentPlayerEntry
        ? ranked.find(
            (e) => e.name === currentPlayerEntry!.name && e.rank === null,
          ) || null
        : null;
      setNewEntry(entryBelow10);
    }

    setLeaderboard(top10);
  }, [newResult]); // Re-run effect if newResult changes

  return (
    <div className="mt-8 flex flex-col gap-6 h-full w-full px-8 text-black">
      <h2 className="subheader text-center text-3xl font-bold">Leaderboards</h2>
      {/* Adjusted div for table responsiveness */}
      <div className="overflow-x-auto h-full 2xl:h-full sm:h-5/6 lg:h-[50%]  lg:w-[100%] lg:mx-auto">
        <table className="w-full rounded-lg shadow-md ">
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
            {leaderboard.map((entry) => {
              // Check if the current entry being rendered is the new player's score
              const isHighlighted =
                highlightPlayerName &&
                entry.name === highlightPlayerName &&
                entry.score === newResult?.score && // Match score too for uniqueness
                entry.date === newResult?.date; // Match date for uniqueness

              return (
                <tr
                  key={`${entry.rank}-${entry.name}-${entry.score}`} // Added score to key for better uniqueness
                  className={`${isHighlighted ? " bg-green-200/30 border border-green-400" : "even:bg-zinc-900/15"}`}
                >
                  <td className="p-3 font-semibold">{entry.rank}</td>
                  <td className="p-3 truncate">{entry.name}</td>
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
              );
            })}
            {newEntry && ( // Only render this row if newEntry is not null (i.e., not in top 10)
              <tr className="bg-orange-200/30 border border-orange-400">
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
