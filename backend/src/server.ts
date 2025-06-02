import express from 'express';
import cors from 'cors';
import { getColor, getCurrentRoundInformation, setColor, testApi } from './api';
import { model_getRoundInformation, model_getSelectedColor } from './model';
import { controller_readExpressions } from './controller';

// Server setup
const app = express();
app.use(cors());
app.use(express.json());

// Defining API endpoints found in api.ts
app.post('/setcolor', setColor(model_getSelectedColor));
app.post('/getcolor', getColor(model_getSelectedColor));
app.post('/testapi', testApi());
app.post('/getroundinformation', getCurrentRoundInformation(model_getRoundInformation));

controller_readExpressions();

// Server startup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});