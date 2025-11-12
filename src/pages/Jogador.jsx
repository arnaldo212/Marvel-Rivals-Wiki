import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./Jogador.module.css";

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
      if(query.length < 1){
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
                {/*<small>Nível {jogador.nivel} ° {jogador.ranque.trim()}</small> será que é melhor mostrar só o nome na sugestão?*/}
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
          //setJogador(location.state.selectedJogador);
          const jogadorFromState = location.state.selectedJogador;
          setJogador(jogadorFromState);

          //se ja tem estatisticas (veio do ranking), usa direto
          if (jogadorFromState.kda !== undefined || jogadorFromState.partidas_jogadas !== undefined) {
            setEstatisticas(jogadorFromState);
            setLoadingStats(false);
          } else {
            // Senão, busca as estatísticas
            handleSelectJogador(jogadorFromState);
          }
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
   // console.log("Buscando estatísticas para:", selectedJogador.nome);
    const response = await fetch(`https://api-marvel-rivals.onrender.com/rank/statistics?nome_jogador=${encodeURIComponent(selectedJogador.nome.trim())}`);

    if(!response.ok){
      throw new Error("Erro ao buscar estatísticas de jogador");
    }

    let stats = await response.json();

   if (!stats) {
      throw new Error("Nenhuma estatística encontrada para este jogador");
    }

    //a api precisa encontrar o jogador correto
    let jogadorStats = null;
    
    if (Array.isArray(stats) && stats.length > 0) {
      //procura o jogador pelo nome
      jogadorStats = stats.find(s => 
        s.nome_jogador?.toLowerCase().trim() === selectedJogador.nome.toLowerCase().trim()
      );
      
      //se n encontrar pelo nome exato, pega o primeiro (precisa testar isso dps)
      if (!jogadorStats) {
        //console.log("Jogador não encontrado pelo nome, usando primeiro item");
        jogadorStats = stats[0];
      }
      
      //debug
      /*console.log("Jogador encontrado:", jogadorStats);
      console.log("Partidas:", jogadorStats?.partidas_jogadas);
      console.log("KDA:", jogadorStats?.kda);*/
    }

    if (jogadorStats) {
      setEstatisticas(jogadorStats);
    } else {
      throw new Error("Nenhuma estatística encontrada");
    }
  } catch (err) {
    console.error(err);
    setError(err.message);
    //setEstatisticas(null);
  } finally {
    setLoadingStats(false);
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
