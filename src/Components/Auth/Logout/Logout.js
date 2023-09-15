import React from "react";
import styles from "./Logout.module.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth/auth-slice";

function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.removeUserDetails());
  };
  return (
    <Button
      variant="contained"
      className={styles.logoutBtn}
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
}

export default Logout;
