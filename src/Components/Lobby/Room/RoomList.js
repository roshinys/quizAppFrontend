import React from "react";
import Stack from "@mui/material/Stack";
import SingleRoom from "./SingleRoom";

function RoomList({ label, roomList, status }) {
  return (
    <Stack direction="row" spacing={4} style={{ marginTop: "30px" }}>
      <h3>{label}</h3>
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
    </Stack>
  );
}

export default RoomList;
