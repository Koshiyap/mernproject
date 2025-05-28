// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    answer: "Delhi",
  },
  {
    question: "Who developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
];

app.get('/questions', (req, res) => {
  res.json(questions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
