import React from "react";
import Room from "./Room/Room";
import styles from "./Lobby.module.css";

function Lobby() {
  return (
    <div className={styles.lobby}>
      <Room />
    </div>
  );
}

export default Lobby;
