import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, fetchRooms } from "../../../store/room/room-action";
import RoomList from "./RoomList";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Room.module.css";
import socket from "../../../socket/socket";

function generateRandomName(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let randomName = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomName += characters.charAt(randomIndex);
  }

  return randomName;
}

function Room() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { availableRooms, joinedRoom } = useSelector((state) => state.room);
  useEffect(() => {
    dispatch(fetchRooms(token));
  }, [dispatch, token]);

  const createRoomHandler = () => {
    const name = generateRandomName(6);
    dispatch(createRoom(token, name, navigate));
    socket.emit("createRoom");
  };

  socket.on("fetchRoom", () => {
    dispatch(fetchRooms(token));
  });

  return (
    <div className={styles.roomList}>
      <RoomList
        label="Available Rooms"
        roomList={availableRooms}
        status={false}
      />
      <RoomList label="Joined Rooms" roomList={joinedRoom} status={true} />
      {availableRooms.length === 0 && joinedRoom.length === 0 && (
        <Button variant="contained" onClick={createRoomHandler}>
          Create Room
        </Button>
      )}
    </div>
  );
}

export default Room;
