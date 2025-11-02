import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./Jogador.module.css";

/*do jeito que esta so falta arrumar como as partidas e o kda estão
sendo mostrados, ta mostrando sempre o mesmo */



//funcao pra determinar a cor do rank
const getRankCor = (rank) => {
  const rankNormalizado = rank.trim().toLowerCase();
  const cores = {
    'bronze': '#CD7F32',
    'prata': '#C0C0C0',
    'ouro': '#FFD700',
    'platina': '#E5E4E2',
    'diamante': '#B9F2FF',
    'grão-mestre': '#9D00FF',
    'celestial': '#FF1744',
    'eternity': '#ff6923ff',
    'one-above-all': '#ff008cff',
  };
  return cores[rankNormalizado];
};

//loading
const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '': prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

    return (
      <div className={styles.loading_container}>
        <div className={styles.spinner}></div>
          <p>Carregando perfil{dots}</p>
      </div>
    );
  };

  //componente de busca do jogador
  const BuscaJogador = ({onSearch, jogadores}) => {
    const [query, setQuery] = useState("");
    const [sugestoes, setSugestoes] = useState([]);

    useEffect(() => {
      if(query.length < 2){
        setSugestoes([]);
        return;
      }

      const filtrados = jogadores.filter(j =>
        j.nome.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

      setSugestoes(filtrados);
    }, [query, jogadores]);

    return (
      <div className={styles.busca_container}>
        <h2>Buscar Jogador</h2>
        <div className={styles.busca_input_wrapper}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o nome do jogador"
          className={styles.busca_input}/>

          {sugestoes.length > 0 && (
            <div className={styles.sugestoes}>
              {sugestoes.map((jogador) => (
              <div key={jogador.id_jogador} className={styles.sugestao_item}
              onClick={() => {
                onSearch(jogador);
                setQuery("");
                setSugestoes([]);
              }}
            >
              <span className={styles.sugestao_icone}></span>
              <div>
                <strong>{jogador.nome}</strong>
                <small>Nível {jogador.nivel} ° {jogador.ranque.trim()}</small>
              </div>
            </div>
            ))}
          </div>
          )}
        </div>
      </div>
    );
  };

export default function Jogador() {
  const [jogador, setJogador] = useState(null);
  const [jogadores, setJogadores] = useState([]);
  const [loadingJogadores, setLoadingJogadores] = useState(true);
   const [loadingStats, setLoadingStats] = useState(false);
  const [error, setError] = useState(null);
  const [estatisticas, setEstatisticas] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() =>  {
    const fetchJogadores = async () => {
      try{
        const response = await fetch("https://api-marvel-rivals.onrender.com/jogadores/");
        if(!response.ok) throw new Error("Erro ao carregar jogadores");
        const data = await response.json();
        setJogadores(data);

        //se veio da busca, seleciona o jogador
        if(location.state?.selectedJogador){
          setJogador(location.state.selectedJogador);
        }
      }catch(err){
        setError(err.message);
      }finally{
        setLoadingJogadores(false);
      }
    };

    fetchJogadores();
}, [location.state]);

const handleSelectJogador = async (selectedJogador) => {
  setJogador(selectedJogador);
  setLoadingStats(true);
  setEstatisticas(null); // reseta ao trocar de jogador

  try{
    const response = await fetch(`https://api-marvel-rivals.onrender.com/rank/statistics?nome=${encodeURIComponent(selectedJogador.nome)}`);

    if(!response.ok){
      throw new Error("Erro ao buscar estatísticas de jogador");
    }

    let stats = await response.json();
    console.log(" Estatísticas recebidas:", stats);

    // se vier como array [ { ... } ], pega o primeiro item
      if (Array.isArray(stats)) stats = stats[0];
    setEstatisticas(stats);
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

if(loadingJogadores) return <Loading />;

if(error){
  return(
    <div className={styles.error_container}>
      <h2>Erro ao carregar</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Tentar Novamente</button>
    </div>
  );
}

  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <header className={styles.header}>
          <h1>Perfil do Jogador</h1>
          <p>Visualize informações detalhadas sobre um jogador específico.</p>
        </header>

        {/*busca de jogador */}
        <BuscaJogador onSearch={handleSelectJogador} jogadores={jogadores} />

        {/*perfil */}
        {jogador ? (
          <div className={styles.perfil_container}>
            {/*card principal */}
            <div className={styles.perfil_card}>
              <div className={styles.perfil_header}>
                <div className={styles.avatar}>
                  <span className={styles.avatar_icon}></span>
                </div>
                <div className={styles.perfil_info}>
                  <h2>{jogador.nome}</h2>
                  <p className={styles.id_jogador}>ID: #{jogador.id_jogador}</p>
                </div>
              </div>

              <div className={styles.stats_grid}>
                {/**nivel */}
                <div className={styles.stat_card}>
                  <div className={styles.stat_icon}>raio</div>
                  <div className={styles.stat_info}>
                    <span className={styles.stat_label}>Nível</span>
                    <span className={styles.stat_value}>{jogador.nivel}</span>
                  </div>
                  <div className={styles.stat_info}>
                    <span className={styles.stat_label}>Ranque</span>
                    <span className={styles.stat_value} style={{color: getRankCor(jogador.ranque)}}>
                      {jogador.ranque.trim() || 'Sem rank'}
                    </span>
                  </div>
                </div>

                {/*partidas jogadas*/}
                <div className={styles.stat_card}>
                  <div className={styles.stat_icon}></div>
                  <div className={styles.stat_info}>
                    <span className={styles.stat_label}>Partidas</span>
                    <span className={styles.stat_value}>{estatisticas?.partidas_jogadas ?? '-'}</span>
                  </div>
                </div>

                {/*kda*/}
                <div className={styles.stat_card}>
                  <div className={styles.stat_icon}></div>
                  <div className={styles.stat_info}>
                    <span className={styles.stat_label}>KDA</span>
                    <span className={styles.stat_value}>{estatisticas?.kda ? estatisticas.kda.toFixed(2) : ' 0.00'}</span>
                  </div>
                </div>
              </div>
            </div>

                {/*rank*/}
                <div className={styles.stat_card}>
                
                  
                  </div>

                  {/*buscar outro jogador*/}
                  <button className={styles.buscar_outro}
                  onClick={() => {
                    setJogador(null);
                    setEstatisticas(null);
                  }}>Buscar outro jogador</button>
              </div>
              ) : (
                <div className={styles.empty_state}>
                  <span className={styles.empty_icon}>icone</span>
                  <h3>Nenhum jogador selecionado</h3>
                  <p>Use a busca acima para encontrar um jogador</p>
                </div>
              )}
            </div>
          </div>
  );
}
