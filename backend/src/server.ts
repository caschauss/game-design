import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let selectedColor = "black";
let currentRoundInformation = {
  "expression": "placeholder expression",
  "name": "placeholder name",
  "party": "placeholder party",
  "difficulty": 0,
  "date": "placeholder date",
  "context": "placeholder context",
  "link": "placeholder link"
}

// API test route
app.post('/test', (req, res) => {
  console.log("Received req: ", req.body);
  res.json({ "message": "test" });
});

app.post('/getcolor', (req, res) => {
  let datetime = new Date();
  console.log("Received colour request at " + datetime);
  res.json({ "color": selectedColor });
})

app.post('/setcolor', (req, res) => {
  let datetime = new Date();
  selectedColor = req.body.color;
  console.log("Received colour modification at " + datetime + " to color: " + selectedColor);
  res.json({ "message": "ok" });
})

app.post('/getroundinformation', (req, res) => {
  let datetime = new Date();
  console.log("Received round information request at " + datetime);
  res.json(currentRoundInformation);
})

// Setup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

// curl -X POST http://localhost:3000/getroundinformation -H-Type: apption: application/json" -d '{"message": "test"}'
