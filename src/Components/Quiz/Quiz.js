import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../socket/socket";
import { useSelector } from "react-redux";
import Question from "./Question";
import { addToGameResult } from "../../api/api";
import styles from "./Quiz.module.css";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "setStatus":
      return { ...state, status: action.payload };
    case "setPoints":
      return { ...state, points: action.payload };
    case "setAnswered":
      return { ...state, answered: action.payload };
    case "setIndex":
      return { ...state, index: action.payload };
    case "setQuestion":
      return { ...state, question: action.payload };
    case "setSelectedAnswer":
      console.log(action.payload);
      return { ...state, selectedAnswer: action.payload };
    default:
      return state;
  }
};

const initialState = {
  status: "waiting",
  points: 0,
  answered: false,
  index: 0,
  question: null,
  selectedAnswer: "",
};

function Quiz() {
  const [quiz, dispatch] = useReducer(quizReducer, initialState);
  const { token, userDetails } = useSelector((state) => state.auth);
  const { roomId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("room", roomId, token);
  }, [roomId, token, quiz.status]);

  useEffect(() => {
    if (quiz.status === "completed") {
      async function addResult() {
        const result = { roomId, userId: userDetails._id, score: quiz.points };
        await addToGameResult(result, token, navigate);
        dispatch({ type: "setStatus", payload: "Calculating Result" });
      }
      addResult();
    }
  }, [quiz.status, roomId, token, quiz.points, navigate, userDetails._id]);

  socket.on("startGame", (data) => {
    dispatch({ type: "setStatus", payload: data.message });
  });

  socket.on("newQuestion", async (question, index) => {
    dispatch({ type: "setQuestion", payload: question });
    dispatch({ type: "setAnswered", payload: false });
    if (index + 1 >= 5) {
      dispatch({ type: "setQuestion", payload: null });
      dispatch({ type: "setStatus", payload: "completed" });
      socket.emit("completed", roomId, userDetails._id, quiz.points);
    }
  });

  return (
    <div className={styles.quiz}>
      <h3>Quiz Status - {quiz.status}</h3>
      {quiz.question !== null && <Question quiz={quiz} dispatch={dispatch} />}
      {quiz.status === "completed" && (
        <p>Calculating The Results... Wait for few seconds</p>
      )}
    </div>
  );
}

export default Quiz;
