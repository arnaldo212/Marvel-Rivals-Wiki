// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Sobre o Jogo</h1>
        <p>
          Marvel Rivals é um jogo de tiro 6v6 com heróis da Marvel! Domine seus
          personagens favoritos e lute em arenas dinâmicas.
        </p>
        <button className={styles.btn}>Começar</button>
      </section>

      <section className={styles.services}>
        <h2>Modos de Jogo</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Competitivo</h3>
            <p>Suba de ranking com seus heróis favoritos!</p>
          </div>
          <div className={styles.card}>
            <h3>Casual</h3>
            <p>Partidas rápidas e diversão garantida!</p>
          </div>
        </div>
        <div className={styles.services}>
        <h2>Sem criatividade para textos no momento</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Some other text</h3>
            <p>Not powered by AI</p>
            <button>Iniciar</button>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
