import React, { useState } from "react";
import data from "./QuizData";

const QuizMain = () => {
  const [selectedOpt, setSelectedOpt] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const handleOption = (option, id, correct, index) => {
    let checkOption = selectedOpt
      ? selectedOpt.find((opt) => opt === option)
      : option;
    if (option === correct && checkOption !== option) {
      setSelectedOpt([...selectedOpt, option]);
      setScore((prevState) => prevState + 1);
    }
    const quizComp = document.querySelector(`#quiz--${id}`);
    const options = quizComp.querySelectorAll(".option");
    options.forEach((option) => option.classList.remove("selected"));
    options[index].classList.add("selected");
  };

  const handleSubmit = () => {
    if (score <= data.length) {
      setShowScore(true);
    }
  };

  return (
    <main>
      {!showScore ? (
        <div className="quiz--wrapper">
          {data.map((quiz, index) => {
            return (
              <div key={index} className="quiz--comp" id={`quiz--${quiz.id}`}>
                <h2 className="question">
                  <span className="ques--no">{quiz.id}.</span>
                  {quiz.question}
                </h2>
                <div className="options">
                  {quiz.options.map((option, index) => {
                    return (
                      <div
                        id={quiz.id}
                        onClick={() =>
                          handleOption(option, quiz.id, quiz.correct, index)
                        }
                        key={index}
                        className="option"
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="score-wrapper">
          <h3>Your Score is : {score}</h3>
          <button
            onClick={() => {
              setScore(0);
              setSelectedOpt([]);
              setShowScore(false);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
};

export default QuizMain;
