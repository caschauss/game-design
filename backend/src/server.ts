import express from 'express';
import cors from 'cors';
import { getColor, getCurrentRoundInformation, setColor, testApi } from './api';

const app = express();
app.use(cors());
app.use(express.json());

let selectedColor = "black";
const handleSetColor = (color: string) => {
  selectedColor = color;
}
const handleGetColor = () => {
  return selectedColor;
}

interface RoundInformation {
  expression: string;
  name: string;
  party: string;
  difficulty: number;
  date: string;
  context: string;
  link: string;
}

let currentRoundInformation: RoundInformation = {
  "expression": "placeholder expression",
  "name": "placeholder name",
  "party": "placeholder party",
  "difficulty": 0,
  "date": "placeholder date",
  "context": "placeholder context",
  "link": "placeholder link"
}

const handleGetCurrentRoundInformation = () => {
  return currentRoundInformation;
}

app.post('/setcolor', setColor(handleSetColor));
app.post('/getcolor', getColor(handleGetColor));
app.post('/testapi', testApi());
app.post('/getroundinformation', getCurrentRoundInformation(handleGetCurrentRoundInformation));

app.post('/getroundinformation', (req, res) => {
  let datetime = new Date();
  console.log("Received round information request at " + datetime);
  res.json(currentRoundInformation);
})

// Setup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
