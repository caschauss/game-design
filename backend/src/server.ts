import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let selectedColor = "black";

// API test route
app.post('/test', (req, res) => {
  console.log("Received req: ", req.body);
  res.json({ "message": "test" });
});

app.post('/getcolor', (req, res) => {
  let datetime = new Date();
  console.log("Received colour request at " + datetime);
  res.json({"color": selectedColor});
})

app.post('/setcolor', (req, res) => {
  let datetime = new Date();
  console.log("Received colour modification at " + datetime);
  selectedColor = req.body.color;
  res.json({"message": "ok"});
})

// Setup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});