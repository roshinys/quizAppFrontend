import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    availableRooms: [],
    joinedRoom: [],
  },
  reducers: {
    setRooms(state, action) {
      state.availableRooms = action.payload.availableRooms;
      state.joinedRoom = action.payload.joinedRoom;
    },
    setJoinedRoom(state, action) {
      state.joinedRoom = action.payload.joinedRoom;
    },
    removeJoinedRoom(state, action) {
      state.joinedRoom = [];
    },
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice;
