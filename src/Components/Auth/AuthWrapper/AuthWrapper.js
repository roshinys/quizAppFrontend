import React from "react";
import styles from "./AuthWrapper.module.css";

function AuthWrapper(props) {
  return <div className={styles.authWrapper}>{props.children}</div>;
}

export default AuthWrapper;
