// src/api/quizAPI.ts

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
