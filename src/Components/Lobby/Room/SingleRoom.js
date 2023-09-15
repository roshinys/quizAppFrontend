import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUsertoRoom } from "../../../store/room/room-action";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 100,
  height: 24,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: "center",
  cursor: "pointer",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "lightgray",
  },
}));

function SingleRoom({ name, _id, users, status }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!status) {
      dispatch(addUsertoRoom(token, _id, navigate));
    } else {
      navigate(`/quiz/${_id}`);
    }
  };

  return (
    <div
      style={{
        margin: "5px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DemoPaper onClick={handleClick}>{name}</DemoPaper>
    </div>
  );
}

export default SingleRoom;
