import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Ranking.module.css";

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

//converter rank em valor numérico
const getRankValor = (rank) => {
  const rankNormalizado = rank.trim().toLowerCase();
  const valores = {
    'one-above-all': 9,
    'eternity': 8,
    'celestial': 7,
    'grão-mestre': 6,
    'mestre': 5,
    'diamante': 4,
    'platina': 3,
    'ouro': 2,
    'prata': 1,
    'bronze': 0,
  };
  return valores[rankNormalizado] ?? -1; // Retorna -1 se não tiver rank
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

//componente de filtros
const Filtros = ({filtroAtivo, onFiltroChange}) => {
  const filtros =[
    {id: 'rank', label: 'Rank', icon: 'icone'},
    {id: 'nivel', label: 'Nível', icon: '?'},
    {id: 'kda', label: 'KDA', icon: '??'},
    {id: 'partidas', label: 'Partidas', icon: '???'},
  ];

  return (
    <div className={styles.filtros_container}>
      <h3>Ordenar por:</h3>
      <div className={styles.filtros_buttons}>
        {filtros.map(filtro => (
          <button key={filtro.id} className={`${styles.filtro_btn} ${filtroAtivo === filtro.id ? styles.active : ''}`}
          onClick={() => onFiltroChange(filtro.id)}>
            <span className={styles.filtro_icon}>{filtro.icon}</span>
            {filtro.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Ranking() {
  const [jogadores, setJogadores] = useState([]);
  const [estatisticas, setEstatisticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('rank');

  const navigate = useNavigate();

  useEffect(() =>{
    const fetchData = async () => {
      try{
        //busca jogadores
        const jogadoresRes = await fetch("https://api-marvel-rivals.onrender.com/jogadores/");
        if(!jogadoresRes.ok) throw new Error("erro ao carregar jogadores");
        const jogadoresData = await jogadoresRes.json();

        //busca estatisticas
        const statsRes = await fetch("https://api-marvel-rivals.onrender.com/rank/statistics");
        const statsData = await statsRes.json();

        //combina dados dos jogadores com estatisticas
        const jogadoresComStats = jogadoresData.map(jogador => {
          const stats = statsData.find(s =>
            s.nome_jogador?.toLowerCase().trim() === jogador.nome.toLowerCase().trim()
          );

          return{
            ...jogador,
            partidas_jogadas: stats?.partidas_jogadas || 0,
            kda: stats?.kda || 0,
            total_abates: stats?.total_abates || 0,
            total_mortes: stats?.total_mortes || 0,
            total_assistencias: stats?.total_assistencias || 0,
          };
        });

        setJogadores(jogadoresComStats);
        setEstatisticas(statsData);
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //ordena jogadorees baseado no filtro
  const jogadoresOrdenados = [...jogadores].sort((a, b) => {
    switch(filtro){
      case 'nivel':
        return b.nivel - a.nivel;
      case 'kda':
        return b.kda - a.kda;
      case 'partidas':
        return b.partidas_jogadas - a.partidas_jogadas;
      case 'rank': // ✅ Nova opção
        const rankDiff = getRankValor(b.ranque) - getRankValor(a.ranque);
        // Se ranks iguais, desempata por nível
        return rankDiff !== 0 ? rankDiff : b.nivel - a.nivel;
      default:
        return 0;
    }
  });

  const handleJogadorClick = (jogador) => {
    navigate('/jogador', {state: {selectedJogador: jogador} });
  };

  if (loading) return <Loading />;

  if(error){
    return(
      <div className={styles.error_container}>
        <h2>Erro ao carregar</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <header className={styles.header}>
          <h1>Ranking</h1>
          <p>Confira os melhores jogadores do Marvel Rivals!</p>
        </header>

        <Filtros filtroAtivo={filtro} onFiltroChange={setFiltro} />

        {/*top 3*/}
        {jogadoresOrdenados.length >= 3 && (
          <div className={styles.podio_container}>
            {/*2 lugar*/}
            <div className={`${styles.podio_card} ${styles.segundo}`}>
              <div className={styles.podio_posicao}>
                <span className={styles.medal}>🥈</span>
                <span className={styles.posicao_numero}>2°</span>
              </div>
            <div className={styles.podio_content} onClick={() => handleJogadorClick(jogadoresOrdenados[1])}>
              <div className={styles.podio_avatar}>icone</div>
              <h3>{jogadoresOrdenados[1].nome}</h3>
              <p className={styles.podio_stat}>
                {filtro === 'nivel' && `Nível ${jogadoresOrdenados[1].nivel}`}
                {filtro === 'kda' && `KDA ${jogadoresOrdenados[1].kda.toFixed(2)}`}
                {filtro === 'partidas' && `${jogadoresOrdenados[1].partidas_jogadas} partidas`}
              </p>
              <span className={styles.podio_rank} style={{ color: getRankCor(jogadoresOrdenados[1].ranque)}}>
                {jogadoresOrdenados[1].ranque.trim()}
              </span>
            </div>
            </div>

          {/*1 lugar*/}
          <div className={`${styles.podio_card} ${styles.primeiro}`}>
            <div className={styles.podio_posicao}>
              <span className={styles.medal}>🥇</span>
              <span className={styles.posicao_numero}>1°</span>
            </div>
            <div className={styles.podio_content} onClick={() => handleJogadorClick(jogadoresOrdenados[0])}> 
              <div className={styles.podio_avatar}>icone</div>
              <h3>{jogadoresOrdenados[0].nome}</h3>
              <p className={styles.podio_stat}>
                {filtro === 'nivel' && `Nível ${jogadoresOrdenados[0].nivel}`}
                {filtro === 'kda' && `KDA ${jogadoresOrdenados[0].kda.toFixed(2)}`}
                {filtro === 'partidas' && `${jogadoresOrdenados[0].partidas_jogadas} partidas`}
              </p>

              <span className={styles.podio_rank} style={{color: getRankCor(jogadoresOrdenados[0].ranque)}}>
                {jogadoresOrdenados[0].ranque.trim()}
              </span>
            </div>
          </div>

          {/* 3º Lugar */}
            <div className={`${styles.podio_card} ${styles.terceiro}`}>
              <div className={styles.podio_posicao}>
                <span className={styles.medal}>🥉</span>
                <span className={styles.posicao_numero}>3º</span>
              </div>
              <div 
                className={styles.podio_content}
                onClick={() => handleJogadorClick(jogadoresOrdenados[2])}
              >
                <div className={styles.podio_avatar}>👤</div>
                <h3>{jogadoresOrdenados[2].nome}</h3>
                <p className={styles.podio_stat}>
                  {filtro === 'nivel' && `Nível ${jogadoresOrdenados[2].nivel}`}
                  {filtro === 'kda' && `KDA ${jogadoresOrdenados[2].kda.toFixed(2)}`}
                  {filtro === 'partidas' && `${jogadoresOrdenados[2].partidas_jogadas} partidas`}
                </p>
                <span 
                  className={styles.podio_rank}
                  style={{ color: getRankCor(jogadoresOrdenados[2].ranque) }}
                >
                  {jogadoresOrdenados[2].ranque.trim()}
                </span>
              </div>
            </div>
          </div>

        )}

        {/* Tabela de Ranking */}
        <div className={styles.ranking_table_container}>
          <h2>Classificação Completa</h2>
          <div className={styles.table_wrapper}>
            <table className={styles.ranking_table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Jogador</th>
                  <th>Nível</th>
                  <th>Ranque</th>
                  <th>Partidas</th>
                  <th>KDA</th>
                  <th>Abates</th>
                </tr>
              </thead>
              <tbody>
                {jogadoresOrdenados.map((jogador, index) => (
                  <tr 
                    key={jogador.id_jogador}
                    className={styles.table_row}
                    onClick={() => handleJogadorClick(jogador)}
                  >
                    <td className={styles.posicao}>
                      {index + 1 <= 3 ? (
                        <span className={styles.top3}>
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                        </span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td className={styles.jogador_cell}>
                      <div className={styles.jogador_info}>
                        <span className={styles.avatar_small}>👤</span>
                        <strong>{jogador.nome}</strong>
                      </div>
                    </td>
                    <td className={styles.nivel}>
                      <span className={styles.badge_nivel}>{jogador.nivel}</span>
                    </td>
                    <td>
                      <span 
                        className={styles.badge_rank}
                        style={{ 
                          color: getRankCor(jogador.ranque),
                          borderColor: getRankCor(jogador.ranque)
                        }}
                      >
                        {jogador.ranque.trim() || 'Sem rank'}
                      </span>
                    </td>
                    <td>{jogador.partidas_jogadas}</td>
                    <td>
                      <span 
                        className={styles.kda_value}
                        style={{
                          color: jogador.kda >= 2.0 ? '#4CAF50' : 
                                 jogador.kda >= 1.0 ? '#FFD700' : '#FF5252'
                        }}
                      >
                        {jogador.kda.toFixed(2)}
                      </span>
                    </td>
                    <td>{jogador.total_abates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
