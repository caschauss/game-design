import { Request, Response } from "express";
import { controller_addEntryToScoreboard, controller_newRound } from "./controller";
import { model_getCanData, model_getCurrentScore, model_getScoreboard, model_setCanData } from "./model";

interface ExpressionData {
  expression: string;
  name: string;
  party: string;
  difficulty: number;
  date: number;
  context?: string;
  link: string;
}

interface ScoreboardData {
  name: string;
  score: number;
  date: string;
  powerups?: string;
}

interface CanData {
  colour: string;
  poti: string;
  logButton: string;
  exitButton: string;
}

// Getting current color
export const getColor = (model_setSelectedColor: () => string) => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    console.log("Received color request at " + datetime);
    res.json({ color: model_setSelectedColor() });
  };
};

// Setting current color
export const setColor = (model_setSelectedColor: (color: string) => void) => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    model_setSelectedColor(req.body.color);
    console.log("Received colour modification at " + datetime + " to color: " + req.body.color,);
    res.json({ message: "ok" });
  };
};

// Getting current round information
export const getCurrentRoundInformation = (
  model_getRoundInformation: () => ExpressionData,
) => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    console.log("Received round information request at " + datetime);
    let info: ExpressionData = model_getRoundInformation();
    // info.party = "PLACEHOLDER"; // remove party information before sending
    res.json({ roundInformation: info });
  };
};

// Calling a new round
export const callNewRound = () => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    controller_newRound();
    console.log("Received new round call at " + datetime);
    res.json({ message: "ok" });
  };
};

// Reading current score
export const getCurrentScore = () => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    let score: number = model_getCurrentScore();
    console.log("Received score request at " + datetime);
    res.json({ score: score });
  };
};

// Setter for Difficulty
export const setCurrentDifficulty = (model_setDifficulty: (d: number) => void,) => {
  return (req: Request, res: Response) => {
    const { difficulty } = req.body;

    if (typeof difficulty === "number") {
      model_setDifficulty(difficulty);
      let datetime = new Date();
      console.log("Received new difficulty call at " + datetime + " for difficulty: " + difficulty);
      res.json({ message: "Difficulty set" });
    } else {
      res.status(400).json({ error: "Invalid difficulty value" });
    }
  };
};

// Getting Scoreboard
export const getScoreboard = () => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    let scoreboard: ScoreboardData[] = model_getScoreboard();
    console.log("Received scoreboard request at " + datetime);
    res.json({ scoreboard: scoreboard });
  };
};

// Setting Scoreboard Entry
export const setScoreboardEntry = () => {
  return (req: Request, res: Response) => {

    let datetime = new Date();
    console.log("Received new scoreboard request at " + datetime + " with data " + JSON.stringify(req.body.scoreBoard));

    controller_addEntryToScoreboard("" + datetime, req.body.scoreBoard);
    res.json({ message: "ok" });
  };
};

// Getting CanData
export const getCanData = () => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    let currentCanData: CanData = model_getCanData();
    console.log("Received CanData request at " + datetime);
    res.json({ scoreboard: currentCanData });
  };
};

// Setting CanData
export const setCanData = () => {
  return (req: Request, res: Response) => {

    let datetime = new Date();
    console.log("Received new CanData at " + datetime + " with data " + JSON.stringify(req.body));

    model_setCanData(req.body);
    res.json({ message: "ok" });
  };
};

// API test route
export const testApi = () => {
  return (req: Request, res: Response) => {
    let datetime = new Date();
    console.log("Received API Test at " + datetime);
    res.json({ message: "test" });
  };
};