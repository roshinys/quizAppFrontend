import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    userDetails: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
  },
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload.userDetails;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state.userDetails));
      localStorage.setItem("token", state.token);
    },
    removeUserDetails(state, action) {
      state.userDetails = {};
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
