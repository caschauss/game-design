import express from "express";
import cors from "cors";
import { callNewRound, getColor, getCurrentRoundInformation, getCurrentScore, setColor, testApi, setCurrentDifficulty, getScoreboard, } from "./api";
import { model_getRoundInformation, model_getSelectedColor, model_setSelectedColor, model_setDifficulty, } from "./model";
import { controller_readExpressions, controller_readScoreboard } from "./controller";

// Server setup
const app = express();
app.use(cors());
app.use(express.json());

// Defining API endpoints found in api.ts
app.post("/setcolor", setColor(model_setSelectedColor));
app.post("/getcolor", getColor(model_getSelectedColor));
app.post("/newround", callNewRound());
app.post("/getscore", getCurrentScore());
app.post("/testapi", testApi());
app.post("/getroundinformation", getCurrentRoundInformation(model_getRoundInformation),);
app.post("/setdifficulty", setCurrentDifficulty(model_setDifficulty));
app.post("/getscoreboard", getScoreboard());

controller_readExpressions();
controller_readScoreboard();

// Server startup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
