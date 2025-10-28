import React from "react";
import styles from "./Jogador.module.css";

export default function Jogador() {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <h1>Perfil do Jogador</h1>
        <p>Visualize informações detalhadas sobre um jogador específico.</p>
      </div>
    </div>
  );
}
