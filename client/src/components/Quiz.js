// client/src/components/Quiz.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/questions").then(res => {
      setQuestions(res.data);
    });
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowScore(true);
    }
  };

  if (!questions.length) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      {showScore ? (
        <div className="text-center text-2xl font-bold">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="text-lg font-semibold mb-4">
            Question {current + 1} / {questions.length}
          </div>
          <div className="mb-6">{questions[current].question}</div>
          <div className="space-y-2">
            {questions[current].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
