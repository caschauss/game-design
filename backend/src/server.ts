import express from 'express';
import cors from 'cors';
import { callNewRound, getColor, getCurrentRoundInformation, setColor, testApi } from './api';
import { model_getRoundInformation, model_getSelectedColor, model_setSelectedColor } from './model';
import { controller_readExpressions } from './controller';

// Server setup
const app = express();
app.use(cors());
app.use(express.json());

// Defining API endpoints found in api.ts
app.post('/setcolor', setColor(model_setSelectedColor));
app.post('/getcolor', getColor(model_getSelectedColor));
app.post('/newround', callNewRound());
app.post('/testapi', testApi());
app.post('/getroundinformation', getCurrentRoundInformation(model_getRoundInformation));

controller_readExpressions();

// Server startup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});