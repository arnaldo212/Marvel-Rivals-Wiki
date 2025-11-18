// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.images_banners}></div>
        <div className={styles.images_banners2}>a</div>
      </section>
      
      <section className={styles.news}>
          <h1>O amor está no ar...</h1>
        <div className={styles.news_content}>
          <div className={styles.news_text}>  
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Na semana passada (04/11), Marvel Games e NetEase revelaram as novidades da 5ª Temporada de Marvel Rivals: Love is a Battlefield. Lançada em 14 de novembro, a temporada adiciona o Gambit como novo herói jogável e apresenta um mapa não-combativo da Times Square em comemoração ao primeiro aniversário do jogo!</p>
              <p1>Para mais informações acesse: <a href="https://www.marvel.com/articles/games/marvel-rivals-season-5-love-is-a-battlefield-gambit-rogue-new-times-square-map">Marvel Rivals News</a></p1>
          </div>
          <div className={styles.news_img}></div>
          </div>
      </section>

      <section className={styles.about}>
        <h1>Sobre o jogo</h1>
        <div className={styles.about_text}>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Marvel Rivals é um jogo de tiro tático em terceira pessoa baseado em equipes, que coloca heróis e vilões icônicos da Marvel em combates 6 contra 6 cheios de ação. Desenvolvido pela NetEase Games em parceria com a Marvel Games, o jogo combina mecânicas modernas de shooters com o carisma, poderes e personalidade dos personagens do universo Marvel.
              No centro da história está um conflito causado pelo choque entre múltiplas linhas temporais, desencadeado por diferentes variantes do Doutor Destino. Essa colisão entre realidades cria novos mundos e zonas de batalha onde heróis e vilões de universos distintos se enfrentam para decidir o destino do multiverso.</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Cada personagem possui habilidades únicas, estilos de combate variados e uma habilidade suprema devastadora, incentivando jogadas estratégicas e o trabalho em equipe. Uma das mecânicas mais marcantes é o sistema de “Team-Up”, que permite que combinações específicas de personagens ativem habilidades especiais cooperativas, criando momentos épicos durante as partidas.
              Com mapas dinamicamente destrutíveis, partidas intensas e atualizações frequentes que introduzem novos heróis, modos e eventos, Marvel Rivals oferece uma experiência competitiva acessível, divertida e repleta da energia característica da Marvel.
              Seja lutando pela glória, explorando sinergias entre personagens ou dominando cada mapa, Marvel Rivals proporciona uma experiência vibrante tanto para fãs da Marvel quanto para jogadores que apreciam jogos táticos baseados em equipes.</p>
        </div>
      </section>

      <section className={styles.trailers}>
        <h1>Trailers e Cinemáticas</h1>
        <div className={styles.trailers_content}>
          <div className={styles.trailer_card}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/FFWzIbkXxBU?si=n9zw7SkTMOiM4fW2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className={styles.trailer_card}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/hXOUHb64164?si=MhPbBgPYqny9EzbR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
        <div className={styles.trailers_content}>
          <div className={styles.trailer_card}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gMVfROWEJ24?si=U-WNCXWuaUO9uB8w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className={styles.trailer_card}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/kIhLPAWKKsg?si=tA_P9Xu90YpjoDXr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </section>
      
      <footer className={styles.footer}>
          <div className={styles.footer__content}>
            
            <div className={styles.footer__section}>
              <h2>Sobre o Projeto</h2>
              <p>Este projeto foi desenvolvido para a disciplina de Banco de Dados 2.</p>
              <p>Marvel Rivals Wiki — conteúdo, personagens e informações do jogo.</p>
            </div>

            <div className={styles.footer__section}>
              <h2>Grupo:</h2>
              <ul>
                <li>Arnaldo Godoy</li>
                <li>Gustavo Gomes</li>
                <li>Gustavo Frias</li>
              </ul>
            </div>

            <div className={styles.footer__section}>
              <h2>Repositório</h2>
              <a 
                href="https://github.com/arnaldo212/Marvel-Rivals-Wiki" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub — Our Marvel Rivals Wiki
              </a>
            </div>

          </div>

          <div className={styles.footer__bottom}>
            <p>© {new Date().getFullYear()} Marvel Rivals Wiki — BD2</p>
          </div>
        </footer>


    </div>
  );
}
