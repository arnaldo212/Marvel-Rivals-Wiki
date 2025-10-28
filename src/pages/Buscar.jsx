import React from "react";
import styles from "./Buscar.module.css";

export default function Buscar() {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <h1>Buscar</h1>
        <p>Pesquise heróis, estatísticas e jogadores.</p>
      </div>
    </div>
  );
}
