import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// API test route
app.post('/test', (req, res) => {
  console.log("Received req: ", req.body);
  res.json({ "message": "test" });
});

// Setup
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
