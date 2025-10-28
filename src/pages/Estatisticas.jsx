import React from "react";
import styles from "./Estatisticas.module.css";

export default function Estatisticas() {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <h1>Estatísticas</h1>
        <p>Acompanhe os dados e desempenho dos jogadores e heróis.</p>
      </div>
    </div>
  );
}
