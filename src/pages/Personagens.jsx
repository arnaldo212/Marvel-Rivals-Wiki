import React, { useEffect, useState } from "react";
import styles from "./Personagens.module.css";
import { useLocation, useNavigate } from "react-router-dom";


const getFilteredItems = (query, personagens) => {
  if (!query) return personagens;
  return personagens.filter((personagem) =>
    personagem.nome.toLowerCase().includes(query.toLowerCase())
  );
};

// mapear as imagens dos personagens
const personagemImagens = {
  "Homem-Aranha": "/personagens/homem-aranha.png",
  "Capitao America": "/personagens/capitao.png",
  "Senhor Fantástico": "/personagens/fantastico.png",
  "Groot": "/personagens/groot.png",
  "Homem de Ferro": "/personagens/homem-de-ferro.png",
  "Soldado Invernal": "/personagens/invernal.png",
  "Mulher Invisível": "/personagens/invisivel.png",
  "Magik": "/personagens/magik.png",
  "Pantera Negra": "/personagens/panther.png",
  "Rocket Racoon": "/personagens/rocket.png",
  "Tempestade": "/personagens/tempestade.png",
  "Tocha Humana": "/personagens/tocha.png",
  "Ultron": "/personagens/ultron.png",
  "Garota Esquilo": "/personagens/esquilo.png",
};

const getPersonagemImagem = (nome) => personagemImagens[nome];

const classeMap = {
  1: "Vanguarda",
  2: "Duelista",
  3: "Estrategista",
};

const classeMapIcon = {
  1: "🛡️",
  2: "⚔️",
  3: "🧠",
};

const Loading = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.loading_container}>
      <div className={styles.spinner}></div>
      <p>Carregando personagens{dots}</p>
      <small style={{ color: "#aaa", marginTop: "10px" }}>
        A API pode demorar alguns segundos...
      </small>
    </div>
  );
};

const PersonagemCard = ({ personagem, onClick }) => (
  <div
    className={styles.card}
    onClick={onClick}
    style={{
      backgroundImage: `url(${getPersonagemImagem(personagem.nome)})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className={styles.card_overlay}>
      <div className={styles.card_content}>
        <h3>{personagem.nome}</h3>
        <p>{personagem.classe}</p>
        {personagem.dificuldade && (
          <p>{classeMap[personagem.id_classe] || "Classe indefinida"}</p>
        )}
      </div>
    </div>
  </div>
);

const PersonagemModal = ({ personagem, habilidades_normais, habilidades_colaborativas, onClose }) => {
  if (!personagem) return null;

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_button} onClick={onClose}>
          X
        </button>

        <div className={styles.modal_header}>
          <h2>{personagem.nome}</h2>
        </div>

        <div className={styles.info_section}>
          <div className={styles.modal_image}>
            <img src={getPersonagemImagem(personagem.nome)} alt={personagem.nome} />
          </div>
        </div>

        <div className={styles.modal_body}>
          {personagem.descricao && (
            <div className={styles.info_section}>
              <h3>📖 Descrição</h3>
              <p>{personagem.descricao}</p>
            </div>
          )}

          <div className={styles.info_grid}>
            {personagem.pontos_vida && (
              <div className={styles.info_box}>
                <h4>❤️ Pontos de vida</h4>
                <p>{personagem.pontos_vida}</p>
              </div>
            )}
            {personagem.id_classe && (
              <div className={styles.info_box}>
                <h4>{classeMapIcon[personagem.id_classe]} Classe</h4>
                <p>{classeMap[personagem.id_classe] || "Classe indefinida"}</p>
              </div>
            )}
            {personagem.afiliacao_principal && (
              <div className={styles.info_box}>
                <h4>👥 Afiliação</h4>
                <p>{personagem.afiliacao_principal}</p>
              </div>
            )}
            {personagem.dificuldade && (
              <div className={styles.info_box}>
                <h4>🎯 Dificuldade</h4>
                <p>{personagem.dificuldade}</p>
              </div>
            )}
          </div>

          <div className={styles.habilidade_box}>
          <h4>🛠️ Habilidades</h4>
          <div className={styles.habilidades_normais_content}>
            {habilidades_normais && habilidades_normais.length > 0 ? (
              habilidades_normais.map((hab, index) => (
                <div key={index} className={styles.habilidade_item}>
                  <h3>{hab.nome}</h3>
                  <p>{hab.descricao}</p>
                  {hab.tipo && <p><strong>Tipo:</strong> {hab.tipo}</p>}
                  {typeof hab.dano === "number" && <p><strong>Dano:</strong> {hab.dano}</p>}
                  {"cura" in hab && <p><strong>Cura:</strong> {hab.cura}</p>}
                  {"escudo" in hab && <p><strong>Escudo:</strong> {hab.escudo}</p>}
                  {hab.tempo_recarga && <p><strong>Recarga:</strong> {hab.tempo_recarga}</p>}
                  {typeof hab.alcance === "number" && <p><strong>Alcance:</strong> {hab.alcance}</p>}
                </div>
              ))
            ) : (
              <p>Sem habilidades registradas.</p>
            )}
          </div>
        </div>


          <div className={styles.habilidade_box}>
            <h4>🤜🤛 Habilidades Colaborativas</h4>
            <div className={styles.habilidades_content}>
              {habilidades_colaborativas && habilidades_colaborativas.length > 0 ? (
                habilidades_colaborativas.map((hab, index) => (
                  <div key={index} className={styles.habilidade_item}>
                    <h3>{hab.nome}</h3>
                    <p>{hab.descricao}</p>
                    {hab.tipo && <p>Tipo: {hab.tipo}</p>}
                    {hab.efeito_especial && <p>Efeito: {hab.efeito_especial}</p>}
                    {hab.duracao && <p>Duração: {hab.duracao} segundos</p>}
                    {hab.bonus_habilidade && <p>Bônus: {hab.bonus_habilidade}</p>}
                  </div>
                ))
              ) : (
                <p>Este personagem não possui habilidades colaborativas.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Personagens() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedPersonagem, setSelectedPersonagem] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [habilidadesColab, setHabilidadesColab] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  if (location.state?.selectedPersonagem) {
      const personagem = location.state.selectedPersonagem;
      handleCardClick(personagem);
      navigate('/personagens', { replace: true, state: {} });
    }
  }, [location, navigate]);


  useEffect(() => {
    const fetchPersonagens = async () => {
      try {
        const response = await fetch(
          "https://marvel-rivals-api-mongo.onrender.com/personagens"
        );
        if (!response.ok) throw new Error("Erro ao carregar personagens");
        const data = await response.json();
        setPersonagens(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonagens();
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSelectedPersonagem(null);
  };

  const handleCardClick = async (personagem) => {
    setSelectedPersonagem(personagem);

    try {
      const response = await fetch(
        `https://marvel-rivals-api-mongo.onrender.com/personagens/${personagem._id}/habilidades`
      );
      if (!response.ok) throw new Error("Erro ao carregar habilidades");
      const data = await response.json();
      setHabilidades(data.habilidades_normais || []);
      setHabilidadesColab(data.habilidades_colaboracao || []);
    } catch (err) {
      console.error(err);
      setHabilidades([]);
      setHabilidadesColab([]);
    }
  };

  if (loading) return <Loading />;

  const filteredItems = getFilteredItems(query, personagens);

  return (
    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <div className={styles.header}>
          <h1>Personagens Marvel Rivals</h1>
          <p>Veja a lista completa de heróis e vilões jogáveis em Marvel Rivals.</p>
        </div>

        <div className={styles.search_section}>
          <label htmlFor="search" className="form-label text-white">
            Pesquisar Personagem
          </label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Digite o nome do personagem..."
            className="form-control mb-3"
            aria-label="Campo de busca de personagens"
          />
        </div>

        {selectedPersonagem && (
          <PersonagemModal
            personagem={selectedPersonagem}
            habilidades_normais={habilidades}
            habilidades_colaborativas={habilidadesColab}
            onClose={() => setSelectedPersonagem(null)}
          />
        )}

        <section className={styles.cards_section}>
          <h2>Todos os personagens</h2>
          {filteredItems.length > 0 ? (
            <div className={styles.cards_container}>
              {filteredItems.map((personagem) => (
                <PersonagemCard
                  key={personagem._id}
                  personagem={personagem}
                  onClick={() => handleCardClick(personagem)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.no_results}>
              <p>Nenhum personagem encontrado</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
