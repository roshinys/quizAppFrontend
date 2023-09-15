import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: { showAlertMessage: false, alertMessageContent: null },
  reducers: {
    setAlert(state, action) {
      state.showAlertMessage = true;
      state.alertMessageContent = action.payload.content;
    },
    closeAlert(state) {
      state.showAlertMessage = false;
      state.alertMessageContent = null;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
