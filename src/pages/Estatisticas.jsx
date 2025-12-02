import React, { useState, useEffect } from "react";
import styles from "./Estatisticas.module.css";

export default function Estatisticas() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("Geral");
  const [mostrarJogador, setMostrarJogador] = useState(false);
  const [mostrarPersonagem, setMostrarPersonagem] = useState(true);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const opcoes = ["Geral", "Partidas Jogadas", "Abates", "Vitorias", "Taxa de Vitoria"];

  const handleBusca = async () => {
    if (opcaoSelecionada === "Abates"){ // só faz a busca para "Abates"
      let url = null;
      if (mostrarJogador) {
        url = "https://marvel-rivals-api-mongo.onrender.com/partidas/rank_jogadores";
      } else if (mostrarPersonagem) {
        // FAZER BUSCA DE PERSONAGENS COM MAIS ABATES NO TOTAL NA API
        url = "https://marvel-rivals-api-mongo.onrender.com/partidas/personagens"; 
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
    } else if (opcaoSelecionada === "Partidas Jogadas") {
        let url = null;
        if (mostrarJogador) {
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/rank_jogadores";
        } else if (mostrarPersonagem) {
          // FAZER BUSCA DE PERSONAGENS COM MAIS ABATES NO TOTAL NA API
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/personagens"; 
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
    }  else if (opcaoSelecionada === "Geral") {
        let url = null;
        if (mostrarJogador) {
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/jogadores";// API MONGO
        } else if (mostrarPersonagem) {
          // FAZER BUSCA DE PERSONAGENS COM MAIS ABATES NO TOTAL NA API
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/personagens"; // API MONGO
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
    } else if (opcaoSelecionada === "Vitorias") {
        let url = null;
        if (mostrarJogador) {
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/jogadores";
        } else if (mostrarPersonagem) {
          // FAZER BUSCA DE PERSONAGENS COM MAIS ABATES NO TOTAL NA API
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/personagens"; 
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
    } else if (opcaoSelecionada === "Taxa de Vitoria") {
        let url = null;
        if (mostrarJogador) {
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/jogadores";
        } else if (mostrarPersonagem) {
          // FAZER BUSCA DE PERSONAGENS COM MAIS ABATES NO TOTAL NA API
          url = "https://marvel-rivals-api-mongo.onrender.com/partidas/personagens"; 
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
          <p>Acompanhe os dados e desempenho de todos os jogadores e personagens.</p>
        </header>

        {/* Filtros */}
        <div className={styles.filtros}>
          <div className={styles.dropdown_container}>
            <label htmlFor="estatisticasSelect">Ordenar por:</label>
            <select
              id="estatisticasSelect"
              value={opcaoSelecionada}
              onChange={(e) => setOpcaoSelecionada(e.target.value)}
              className={styles.dropdown}
            >
              {opcoes.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.checkbox_container}>
            <label className={`${styles.checkbox_label} ${
      mostrarJogador ? styles.checkbox_selected : ""
    }`}>
              <input
                type="checkbox"
                checked={mostrarJogador}
                onChange={() => {
                  setMostrarJogador(true);
                  setMostrarPersonagem(false);
                }}
              />
              Jogador
            </label>

            <label className={`${styles.checkbox_label} ${
      mostrarPersonagem ? styles.checkbox_selected : ""
    }`}>
              <input
                type="checkbox"
                checked={mostrarPersonagem}
                onChange={() => {
                  setMostrarJogador(false);
                  setMostrarPersonagem(true);
                }}
              />
              Personagem
            </label>
          </div>
        </div>

        {/* ==== TABELA PARA JOGADORES ==== */}
        {!loading && dados.length > 0 && mostrarJogador && (
          <>
           {opcaoSelecionada === "Geral" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Jogador</th>
                    <th>Taxa de Vitória</th>
                    <th>Partidas Jogadas</th>
                    <th>Número de Vitórias</th>
                    <th>Total Abates</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => a.id_jogador - b.id_jogador)
                    .map((j) => (
                      <tr key={j.id_jogador}>
                        <td>{j.id_jogador}</td>
                        <td>{j.nome_jogador}</td>
                        <td>
                          {j.partidas_jogadas > 0
                            ? (j.partidas_vencidas / j.partidas_jogadas).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>{j.partidas_jogadas}</td>
                        <td>{j.partidas_vencidas}</td>
                        <td>{j.total_abates}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {opcaoSelecionada === "Abates" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Jogador</th>
                    <th>Total Abates</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => b.total_abates - a.total_abates)
                    .map((j) => (
                      <tr key={j.id_jogador}>
                        <td>{j.id_jogador}</td>
                        <td>{j.nome_jogador}</td>
                        <td>{j.total_abates}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {opcaoSelecionada === "Partidas Jogadas" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Jogador</th>
                    <th>Partidas Jogadas</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => b.partidas_jogadas - a.partidas_jogadas)
                    .map((j) => (
                      <tr key={j.id_jogador}>
                        <td>{j.id_jogador}</td>
                        <td>{j.nome_jogador}</td>
                        <td>{j.partidas_jogadas}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {opcaoSelecionada === "Vitorias" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Jogador</th>
                    <th>Número de Vitórias</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => b.partidas_vencidas - a.partidas_vencidas)
                    .map((j) => (
                      <tr key={j.id_jogador}>
                        <td>{j.id_jogador}</td>
                        <td>{j.nome_jogador}</td>
                        <td>{j.partidas_vencidas}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {opcaoSelecionada === "Taxa de Vitoria" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Jogador</th>
                    <th>Taxa de Vitória</th>
                    <th>Número de Vitórias</th>
                    <th>Partidas Jogadas</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => {
                      const taxaA = a.partidas_jogadas > 0 ? a.partidas_vencidas / a.partidas_jogadas : 0;
                      const taxaB = b.partidas_jogadas > 0 ? b.partidas_vencidas / b.partidas_jogadas : 0;
                      return taxaB - taxaA; // ordem decrescente
                    })
                    .map((j) => (
                      <tr key={j.id_jogador}>
                        <td>{j.id_jogador}</td>
                        <td>{j.nome_jogador}</td>
                        <td>
                          {j.partidas_jogadas > 0
                            ? (j.partidas_vencidas / j.partidas_jogadas).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>{j.partidas_vencidas}</td>
                        <td>{j.partidas_jogadas}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </>
        )}





        {/* ==== TABELA PARA PERSONAGENS ==== */}
        {!loading && dados.length > 0 && mostrarPersonagem && (
          <>
           {opcaoSelecionada === "Geral" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Personagem</th>
                    <th>Taxa de Vitória</th>
                    <th>Partidas Jogadas</th>
                    <th>Número de Vitorias</th>
                    <th>Total Abates</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => a.id_personagem - b.id_personagem)
                    .map((j) => (
                      <tr key={j.id_personagem}>
                        <td>{j.id_personagem}</td>
                        <td>{j.nome_personagem}</td>
                        <td>
                          {j.vezes_usado > 0
                            ? (j.total_vitorias / j.vezes_usado).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>{j.vezes_usado}</td>
                        <td>{j.total_vitorias}</td>
                        <td>{j.total_abates}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {opcaoSelecionada === "Abates" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Personagem</th>
                    <th>Total Abates</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => b.total_abates - a.total_abates)
                    .map((p) => (
                      <tr key={p.id_personagem || p.nome_personagem}>
                        <td>{p.id_personagem || "-"}</td>
                        <td>{p.nome_personagem}</td>
                        <td>{p.total_abates}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {opcaoSelecionada === "Partidas Jogadas" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Personagem</th>
                    <th>Partidas Jogadas</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => b.vezes_usado - a.vezes_usado)
                    .map((j) => (
                      <tr key={j.id_personagem}>
                        <td>{j.id_personagem}</td>
                        <td>{j.nome_personagem}</td>
                        <td>{j.vezes_usado}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {opcaoSelecionada === "Vitorias" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Personagem</th>
                    <th>Número de Vitórias</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => b.total_vitorias - a.total_vitorias)
                    .map((j) => (
                      <tr key={j.id_personagem}>
                        <td>{j.id_personagem}</td>
                        <td>{j.nome_personagem}</td>
                        <td>{j.total_vitorias}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {opcaoSelecionada === "Taxa de Vitoria" && (
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome do Personagem</th>
                    <th>Taxa de Vitória</th>
                    <th>Número de Vitórias</th>
                    <th>Partidas Jogadas</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dados]
                    .sort((a, b) => {
                      const taxaA = a.vezes_usado > 0 ? a.total_vitorias / a.vezes_usado : 0;
                      const taxaB = b.vezes_usado > 0 ? b.total_vitorias / b.vezes_usado : 0;
                      return taxaB - taxaA; // ordem decrescente
                    })
                    .map((j) => (
                      <tr key={j.id_personagem}>
                        <td>{j.id_personagem}</td>
                        <td>{j.nome_personagem}</td>
                        <td>
                          {j.vezes_usado > 0
                            ? (j.total_vitorias / j.vezes_usado).toFixed(2)
                            : "0.00"}
                        </td>
                        <td>{j.total_vitorias}</td>
                        <td>{j.vezes_usado}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {loading && <p>Carregando estatísticas...</p>}
        {erro && <p className={styles.erro}>Erro: {erro}</p>}
  </div>
</div>
  );
}
