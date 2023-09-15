import React, { useState } from "react";
import styles from "./Question.module.css";
import { Button } from "@mui/material";

function Question({ dispatch, quiz }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const handleOptionChange = (e) => {
    setSelectedAnswer(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quiz.answered && quiz.question.answer === selectedAnswer) {
      dispatch({ type: "setPoints", payload: quiz.points + 10 });
    }
    dispatch({ type: "setAnswered", payload: true });
  };

  return (
    <div className={styles.question}>
      <h2>{quiz.question.text}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
        {!quiz.answered && (
          <Button variant="contained" type="submit">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}

export default Question;
