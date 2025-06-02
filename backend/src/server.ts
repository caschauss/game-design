import express from 'express';
import cors from 'cors';
import { getColor, getCurrentRoundInformation, setColor, testApi } from './api';
import { handldeGetCurrentRoundInformation } from './model';

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

app.post('/setcolor', setColor(handleSetColor));
app.post('/getcolor', getColor(handleGetColor));
app.post('/testapi', testApi());
app.post('/getroundinformation', getCurrentRoundInformation(handldeGetCurrentRoundInformation));

// Setup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});