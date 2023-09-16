import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGameResult } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Result.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function Result() {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [score, setScore] = useState(null);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    // const intervalId = setInterval(async () => {
    //   const newScore = await getGameResult(gameId, token);
    //   if (newScore) {
    //     setScore(newScore);
    //   }
    // }, 1000);
    async function gameResponse() {
      const newScore = await getGameResult(gameId, token);
      console.log(newScore);
      if (newScore) {
        setScore(newScore);
      }
    }
    gameResponse();
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [token, gameId]);
  return (
    <div className={styles.scoreBoard}>
      <h3>Result</h3>
      {score === null && <p>No Result to display</p>}
      {score !== null && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Details</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  You
                </TableCell>
                <TableCell component="th" scope="row">
                  {score.you}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Opponent
                </TableCell>
                <TableCell component="th" scope="row">
                  {score.opponent}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        onClick={() => {
          navigate("/lobby");
        }}
        style={{
          marginTop: "10px",
        }}
      >
        Back to lobby
      </Button>
    </div>
  );
}

export default Result;
