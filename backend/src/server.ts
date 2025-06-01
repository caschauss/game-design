import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let selectedColour = "black";

// API test route
app.post('/test', (req, res) => {
  console.log("Received req: ", req.body);
  res.json({ "message": "test" });
});

app.post('/getcolour', (req, res) => {
  let datetime = new Date();
  console.log("Received colour request at " + datetime);
  res.json({"colour": selectedColour});
})

// Setup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
