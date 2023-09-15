import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alert/alert-slice";
import authSlice from "./auth/auth-slice";
import roomSlice from "./room/room-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    room: roomSlice.reducer,
  },
});

export default store;
