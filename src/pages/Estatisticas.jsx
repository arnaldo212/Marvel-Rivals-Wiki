import React, { useState, useEffect } from "react";
import styles from "./Estatisticas.module.css";

export default function Estatisticas() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [mostrarJogador, setMostrarJogador] = useState(false);
  const [mostrarPersonagem, setMostrarPersonagem] = useState(false);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const opcoes = ["Partidas Jogadas", "Abates", "Vitorias"];

  const handleBusca = async () => {
    if (opcaoSelecionada === "Abates"){ // só faz a busca para "Abates"
      let url = null;
      if (mostrarJogador) {
        url = "https://api-marvel-rivals.onrender.com/rank/statistics";
      } else if (mostrarPersonagem) {
        // FAZER BUSCA DE PERSONAGENS COM MAIS ABATES NO TOTAL NA API
        url = "https://api-marvel-rivals.onrender.com/rank/statistics/magik"; 
      } else {
        setDados([]);
        return;
      }

      try {
        setLoading(true);
        setErro(null);
        setDados([]);

        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Erro ao buscar estatísticas.");

        const data = await resp.json();
        setDados(data);
      } catch (err) {
        console.error("Erro na busca:", err);
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }
  };
  //if(opcaoSelecionada === "")

  useEffect(() => {
    handleBusca();
  }, [opcaoSelecionada, mostrarJogador]);

  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <header className={styles.header}>
          <h1>Estatísticas</h1>
          <p>Acompanhe os dados e desempenho dos jogadores e heróis.</p>
        </header>

        {/* Filtros */}
        <div className={styles.filtros}>
          <div className={styles.dropdown_container}>
            <label htmlFor="estatisticasSelect">Selecione uma opção:</label>
            <select
              id="estatisticasSelect"
              value={opcaoSelecionada}
              onChange={(e) => setOpcaoSelecionada(e.target.value)}
              className={styles.dropdown}
            >
              <option value="">-- Escolha uma opção --</option>
              {opcoes.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.checkbox_container}>
            <label className={styles.checkbox_label}>
              <input
                type="checkbox"
                checked={mostrarJogador}
                onChange={() => setMostrarJogador(!mostrarJogador)}
              />
              Jogador
            </label>

            <label className={styles.checkbox_label}>
              <input
                type="checkbox"
                checked={mostrarPersonagem}
                onChange={() => setMostrarPersonagem(!mostrarPersonagem)}
              />
              Personagem
            </label>
          </div>
        </div>

        {/* Resultado */}
        <div className={styles.resultado}>
          {loading && <p>Carregando dados...</p>}
          {erro && <p style={{ color: "red" }}> {erro}</p>}

          {!loading && dados.length > 0 && (
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Jogador</th>
                  <th>Partidas</th>
                  <th>Abates</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((jogador) => (
                  <tr key={jogador.id_jogador}>
                    <td>{jogador.id_jogador}</td>
                    <td>{jogador.nome_jogador}</td>
                    <td>{jogador.partidas_jogadas}</td>
                    <td>{jogador.total_abates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* tabela de personagens */}
          {!loading && dados.length > 0 && mostrarPersonagem && (
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Personagem</th>
                  <th>Total Abates</th>
                  <th>Partidas</th>
                  <th>Jogadores únicos</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((p) => (
                  <tr key={p.id_personagem || p.nome_personagem}>
                    <td>{p.id_personagem || "-"}</td>
                    <td>{p.nome_personagem}</td>
                    <td>{p.total_abates}</td>
                    <td>{p.partidas_jogadas || "-"}</td>
                    <td>{p.jogadores_unicos || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && !erro && dados.length === 0 && (
            <p>Selecione "Abates" e marque "Jogador" para ver resultados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
