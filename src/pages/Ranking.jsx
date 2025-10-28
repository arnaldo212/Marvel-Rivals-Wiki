import React from "react";
import styles from "./Ranking.module.css";

export default function Ranking() {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <h1>Ranking</h1>
        <p>Confira os melhores jogadores do Marvel Rivals!</p>
      </div>
    </div>
  );
}
