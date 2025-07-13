import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { powerUps } from "../../data/data"; // Pfad anpassen falls nötig
import { getScoreboard, getSendScoreboardEntry } from "../../api/quizAPI";
import React from "react";

type LeaderboardEntry = {
  rank: number | null;
  name: string;
  score: number;
  date: string;
  powerUps: string[];
};

type PowerUp = {
  id: string;
  color: string;
  label: string;
  icon: React.JSX.Element;
};

interface ScoreboardData {
  name: string;
  score: number;
  date: string;
  powerups?: string;
}

const powerUpMeta = Object.fromEntries(
  powerUps.map((pu: PowerUp) => [
    pu.id,
    {
      color: pu.color,
      label: pu.label,
      short: pu.icon,
    },
  ]),
);

export default function LeaderboardPanel() {
  const location = useLocation();
  const newResult = location.state as {
    playerName?: string;
    score?: number;
    date?: string;
    selectedPowerUps?: string[];
  };

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [scoreSent, setScoreSent] = useState(false);

  const [highlightPlayerName, setHighlightPlayerName] = useState<string | null>(
    null,
  );
  const [highlightScore, setHighlightScore] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Nur 1x Score senden
        if (
          !scoreSent &&
          newResult?.playerName &&
          typeof newResult.score === "number"
        ) {
          const newScoreData: ScoreboardData = {
            name: newResult.playerName,
            score: Math.round(newResult.score),
            date: newResult.date || new Date().toISOString().slice(0, 10),
            powerups: newResult.selectedPowerUps
              ? newResult.selectedPowerUps.join(",")
              : "",
          };

          await getSendScoreboardEntry(newScoreData);

          if (isMounted) {
            setHighlightPlayerName(newResult.playerName);
            setHighlightScore(Math.round(newResult.score));
            setScoreSent(true);
          }
        } else if (
          newResult?.playerName &&
          typeof newResult.score === "number" &&
          !highlightPlayerName
        ) {
          // Score schon gesendet, Highlight aber setzen
          setHighlightPlayerName(newResult.playerName);
          setHighlightScore(Math.round(newResult.score));
        }

        const apiData = await getScoreboard();

        // Duplikate entfernen (falls nötig)
        const uniqueMap = new Map<string, LeaderboardEntry>();
        apiData.forEach((entry: ScoreboardData) => {
          const key = `${entry.name}-${entry.score}-${entry.date}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, {
              rank: null,
              name: entry.name,
              score: entry.score,
              date: entry.date,
              powerUps: entry.powerups
                ? entry.powerups
                    .split(",")
                    .map((p: string) => p.trim())
                    .filter(Boolean)
                : [],
            });
          }
        });

        const convertedData = Array.from(uniqueMap.values());

        // Sortieren nach Score absteigend
        convertedData.sort((a, b) => b.score - a.score);

        // Ränge vergeben
        const rankedData = convertedData.map((entry, idx) => ({
          ...entry,
          rank: idx + 1,
        }));

        if (isMounted) {
          setLeaderboard(rankedData.slice(0, 10)); // Nur Top 10 anzeigen
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unbekannter Fehler");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [newResult, scoreSent, highlightPlayerName]);

  if (loading) {
    return (
      <div className="mt-8 flex flex-col gap-6 h-full w-full px-8 text-black">
        <h2 className="subheader text-center text-3xl font-bold">
          Leaderboards
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Lade Leaderboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex flex-col gap-6 h-full w-full px-8 text-black">
        <h2 className="subheader text-center text-3xl font-bold">
          Leaderboards
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Fehler beim Laden: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-6 h-full w-full px-8 text-black">
      <h2 className="subheader text-center text-3xl font-bold">Leaderboards</h2>
      <div className="overflow-x-auto h-full 2xl:h-full sm:h-5/6 lg:h-[50%] lg:w-[100%] lg:mx-auto">
        <table className="w-full rounded-lg shadow-md ">
          <thead className="bg-zinc-900 text-left text-white">
            <tr>
              <th className="p-3">Platz</th>
              <th className="p-3 ">Name</th>
              <th className="p-3">Punkte</th>
              <th className="p-3">Datum</th>
              <th className="p-3">Power-Ups</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => {
              const isHighlighted =
                highlightPlayerName === entry.name &&
                highlightScore === entry.score;

              return (
                <tr
                  key={`${entry.rank}-${entry.name}-${entry.score}-${entry.date}`}
                  className={
                    isHighlighted
                      ? "bg-green-200/30 border border-green-400"
                      : "even:bg-zinc-900/15"
                  }
                >
                  <td className="p-3 font-semibold">{entry.rank}</td>
                  <td className="p-3 truncate max-w-48">{entry.name}</td>
                  <td className="p-3">{entry.score.toLocaleString()}</td>
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {entry.powerUps.map((code, index) => (
                        <div
                          key={`${code}-${index}`}
                          className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center text-white ${
                            powerUpMeta[code]?.color ?? "bg-gray-500"
                          }`}
                          title={powerUpMeta[code]?.label}
                        >
                          {powerUpMeta[code]?.short || code}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
