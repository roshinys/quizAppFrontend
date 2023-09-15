import React from "react";
import Stack from "@mui/material/Stack";
import SingleRoom from "./SingleRoom";
import styles from "./RoomList.module.css";

function RoomList({ label, roomList, status }) {
  return (
    <Stack
      direction="row"
      spacing={4}
      style={{ marginTop: "30px" }}
      className={styles.stack}
    >
      <h3 className={styles.label}>{label}</h3>
      {roomList.length > 0 &&
        roomList.map((room) => {
          return (
            <SingleRoom
              key={room._id}
              name={room.name}
              _id={room._id}
              users={room.users}
              status={status}
            />
          );
        })}
      {roomList.length === 0 && <p>No Rooms to display</p>}
    </Stack>
  );
}

export default RoomList;
