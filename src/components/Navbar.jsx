import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <Link to="/" className={styles.navbar__links2}>
          RIVALS
        </Link>

        <div
          className={`${styles.navbar__toggle} ${
            isActive ? styles.isActive : ""
          }`}
          onClick={toggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <ul
          className={`${styles.navbar__menu} ${isActive ? styles.active : ""}`}
        >
          <li className={styles.navbar__item}>
            <Link to="/" className={styles.navbar__links}>
              Home
            </Link>
          </li>
          <li className={styles.navbar__item}>
            <Link to="/personagens" className={styles.navbar__links}>
              Personagens
            </Link>
          </li>
          <li className={styles.navbar__item}>
            <Link to="/buscar" className={styles.navbar__links}>
              Buscar
            </Link>
          </li>
          <li className={styles.navbar__item}>
            <Link to="/estatisticas" className={styles.navbar__links}>
              Estatísticas
            </Link>
          </li>
          <li className={styles.navbar__item}>
            <Link to="/ranking" className={styles.navbar__links}>
              Ranking
            </Link>
          </li>
          <li className={styles.navbar__item}>
            <Link to="/jogador" className={styles.navbar__links}>
              Jogador
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
