import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../socket/socket";
import { useSelector } from "react-redux";
import Question from "./Question";
import { addToGameResult } from "../../api/api";

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
    default:
      return state;
  }
};

function Quiz() {
  const initialState = {
    status: "waiting",
    points: 0,
    answered: false,
    index: 0,
    question: null,
  };
  const [quiz, dispatch] = useReducer(quizReducer, initialState);
  const { token, userDetails } = useSelector((state) => state.auth);
  const { roomId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("room", roomId, token);
    });
    return async () => {
      socket.off("connect");
    };
  }, [roomId, token, quiz.status]);

  useEffect(() => {
    if (quiz.status === "active") {
      socket.emit("generateQuestion", roomId, quiz.index);
    }
    if (quiz.status === "completed") {
      const result = { roomId, userId: userDetails._id, score: quiz.points };
      addToGameResult(result, token, navigate);
    }
  }, [
    quiz.status,
    roomId,
    quiz.index,
    token,
    quiz.points,
    navigate,
    userDetails._id,
  ]);

  socket.on("startGame", (data) => {
    dispatch({ type: "setStatus", payload: data.message });
  });

  socket.on("newQuestion", async (question) => {
    dispatch({ type: "setQuestion", payload: question });
    dispatch({ type: "setAnswered", payload: false });
    if (quiz.index + 1 < 5) {
      setTimeout(() => {
        dispatch({ type: "setIndex", payload: quiz.index + 1 });
      }, 3000);
    } else {
      dispatch({ type: "setQuestion", payload: null });
      dispatch({ type: "setStatus", payload: "completed" });
      socket.emit("completed", roomId, userDetails._id, quiz.points);
    }
  });

  return (
    <div>
      Quiz Status - {quiz.status}
      {quiz.question !== null && <Question quiz={quiz} dispatch={dispatch} />}
      <span>{quiz.points}</span>
    </div>
  );
}

export default Quiz;
