import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGameResult } from "../../api/api";
import { useParams } from "react-router-dom";

function Result() {
  const { gameId } = useParams();
  const [score, setScore] = useState(null);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    async function gameResponse() {
      const newScore = await getGameResult(gameId, token);
      console.log(newScore);
      if (newScore) {
        setScore(newScore);
      }
    }
    gameResponse();
  }, [token, gameId]);
  return (
    <div>
      Result
      {score !== null && (
        <div>
          <p>You - {score.you}</p>
          <p>Opponent - {score.opponent}</p>
        </div>
      )}
    </div>
  );
}

export default Result;
