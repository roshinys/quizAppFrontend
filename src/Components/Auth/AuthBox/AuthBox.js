import React from "react";
import styles from "./AuthBox.module.css";

function AuthBox(props) {
  return <div className={styles.authBox}>{props.children}</div>;
}

export default AuthBox;
