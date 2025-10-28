import React from "react";
import styles from "./Personagens.module.css";

export default function Personagens() {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <h1> Personagens</h1>
        <p>Veja a lista completa de heróis e vilões jogáveis em Marvel Rivals.</p>
      </div>
    </div>
  );
}
