type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  date: string;
};

const mockData: LeaderboardEntry[] = [
  { rank: 1, name: "Anna", score: 980, date: "2025-06-01" },
  { rank: 2, name: "Ben", score: 940, date: "2025-06-03" },
  { rank: 3, name: "Clara", score: 910, date: "2025-06-02" },
  { rank: 4, name: "David", score: 890, date: "2025-06-05" },
  { rank: 5, name: "Ella", score: 870, date: "2025-06-04" },
  { rank: 6, name: "Felix", score: 860, date: "2025-06-06" },
  { rank: 7, name: "Greta", score: 845, date: "2025-06-07" },
  { rank: 8, name: "Henry", score: 830, date: "2025-06-08" },
  { rank: 9, name: "Ida", score: 820, date: "2025-06-09" },
  { rank: 10, name: "Jonas", score: 810, date: "2025-06-10" },
];

export default function LeaderboardPanel() {
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
            </tr>
          </thead>
          <tbody>
            {mockData.map((entry) => (
              <tr key={entry.rank} className="even:bg-zinc-900/15">
                <td className="p-3 font-semibold">{entry.rank}</td>
                <td className="p-3">{entry.name}</td>
                <td className="p-3">{entry.score}</td>
                <td className="p-3">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
