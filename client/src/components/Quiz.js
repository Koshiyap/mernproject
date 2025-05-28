import React, { useState, useEffect } from "react";
import axios from "axios";
import './Quiz.css'; 

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    axios.get("http://localhost:5000/questions").then(res => {
      setQuestions(res.data);
    });
  }, []);

  useEffect(() => {
    if (!showScore && questions.length) {
      if (timer === 0) {
        handleAnswer(null);
        return;
      }
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, showScore, questions.length]);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setTimer(5); 
    } else {
      setShowScore(true);
    }
  };

  if (!questions.length) return <div className="quiz-container">Loading...</div>;

  return (
    <div className="page-background">
      <div className="quiz-container">
        {showScore ? (
          <div className="score-display-container">
            <div className="score-message">🎉 You scored {score} out of {questions.length} 🎉</div>
            {score < questions.length && (
              <button
                className="play-again-button"
                onClick={() => {
                  setScore(0);
                  setCurrent(0);
                  setShowScore(false);
                  setTimer(5);
                }}
              >
                Play Again
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="question-count">
              Question {current + 1} / {questions.length}
            </div>
            <div className="timer">Time Left: {timer}s</div>
            <div className="question-text">{questions[current].question}</div>
            <div>
              {questions[current].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="option-button"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
