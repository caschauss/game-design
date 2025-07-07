// src/api/quizAPI.ts

interface ScoreboardData {
  name: string;
  score: number;
  date: string;
  powerups?: string;
}

const BASE_URL = "http://localhost:3000";

export const testAPI = async () => {
  const res = await fetch(`${BASE_URL}/testapi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "test" }),
  });
  return res.json();
};

export const getColor = async () => {
  const res = await fetch(`${BASE_URL}/getcolor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "test" }),
  });
  return res.json();
};

export const setColor = async (color: string) => {
  await fetch(`${BASE_URL}/setcolor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ color }),
  });
};

export const getRoundInformation = async () => {
  const res = await fetch(`${BASE_URL}/getroundinformation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "test" }),
  });
  return res.json();
};

export const getScoreboard = async () => {
  const res = await fetch(`${BASE_URL}/getscoreboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "test" }),
  });

  const json = await res.json();
  return json.scoreboard; // ✅ Jetzt nur das Array zurückgeben!
};

export const getSendScoreboardEntry = async (
  scoreBoardEntry: ScoreboardData,
) => {
  const res = await fetch(`${BASE_URL}/setscoreboardentry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scoreBoard: scoreBoardEntry }),
  });
  return res.json();
};

export const handleCallNewRound = async () => {
  try {
    await fetch("http://localhost:3000/newround", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "new round" }), // placeholder message
    });

    console.log("Successfully requested new round");
  } catch (error) {
    console.error("Error requesting new round: ", error);
  }
};

export const setDifficulty = async (difficulty: number) => {
  try {
    const res = await fetch(`${BASE_URL}/setdifficulty`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty }),
    });

    if (!res.ok) {
      throw new Error("Failed to set difficulty");
    }

    return await res.json();
  } catch (error) {
    console.error("Error setting difficulty:", error);
  }
};
