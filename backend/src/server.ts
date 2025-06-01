import express from 'express';
import cors from 'cors';
import { getColor, setColor, testApi } from './api';

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

let currentRoundInformation = {
  "expression": "placeholder expression",
  "name": "placeholder name",
  "party": "placeholder party",
  "difficulty": 0,
  "date": "placeholder date",
  "context": "placeholder context",
  "link": "placeholder link"
}


app.post('/setcolor', setColor(handleSetColor));
app.post('/getcolor', getColor(handleGetColor));
app.post('/testapi', testApi());

app.post('/getroundinformation', (req, res) => {
  let datetime = new Date();
  console.log("Received round information request at " + datetime);
  res.json(currentRoundInformation);
})

// Setup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
