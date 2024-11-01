const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
const HOST = 'localhost';

const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

let data = {
  randomNumber: Math.floor(Math.random() * 100) + 1,
};

app.listen(PORT, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});

app.get('/api', (req, res) => {
  res.json(data);
});

app.put('/api', (req, res) => {
  const newNumber = req.body.randomNumber;

  if (newNumber) {
    data.randomNumber = newNumber;
    res.json({ success: true, data });
  } else {
    res.status(400).json({ success: false, error: "No number provided" });
  }
});
