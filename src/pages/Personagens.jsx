import React, {useEffect, useState} from "react";
import styles from "./Personagens.module.css";

/*talvez transformar algumas parte do codigo em componentes, 
por ex a parte dos cards, mas não sei se precisa

talvez melhorar a parte do detalhe dos personagens???
*/
const getFilteredItems = (query, personagens)=> {
  if(!query){
    //return [];
    return personagens;
  }
  return personagens.filter(personagem => 
    personagem.nome.toLowerCase().includes(query.toLowerCase())
  );
};

//mapear as imagens dos personagens
const personagemImagens = {
  "Homem Aranha": "/personagens/homem-aranha.png",
  "Capitão América": "/personagens/capitao.png",
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
}

const getPersonagemImagem = (nome) => {
  return personagemImagens[nome]
};

const classeMap = {
  1: "Vanguarda",
  2: "Duelista",
  3: "Estrategista"
};

const classeMapIcon = {
  1: "🛡️",
  2: "⚔️",
  3: "🧠"
}

//loading
const Loading = () => {
  const [dots, setDots] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.loading_container}>
      <div className={styles.spinner}></div>
        <p>Carregando personagens{dots}</p>
          <small style={{ color: '#aaa', marginTop: '10px'}}>
            A API pode demorar alguns segundos...
          </small>
    </div>
  );
};

// Componente de Card
const PersonagemCard = ({ personagem, onClick }) => (
  <div 
    className={styles.card}
    onClick={onClick}
    style={{
      backgroundImage: `url(${getPersonagemImagem(personagem.nome)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
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

// Componente de Modal
const PersonagemModal = ({ personagem, onClose }) => {
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
              <img 
                src={getPersonagemImagem(personagem.nome)}
                alt={personagem.nome}
              />
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

            {personagem.afilicao_principal && (
              <div className={styles.info_box}>
                <h4>❤️ Pontos de vida</h4>
                <p>{personagem.pontos_vida}</p>
              </div>
            )}

            {personagem.afilicao_principal && (
              <div className={styles.info_box}>
                <h4>{classeMapIcon[personagem.id_classe]} Classe</h4>
                <p>{classeMap[personagem.id_classe] || "Classe indefinida"}</p>
              </div>
            )}

            
            {personagem.afilicao_principal && (
              <div className={styles.info_box}>
                <h4>👥 Afiliação</h4>
                <p>{personagem.afilicao_principal}</p>
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
            <div className={styles.habilidades_content}></div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Componente de Busca
const SearchBar = ({ query, onChange, resultCount }) => (
  <div className={styles.search_section}>
    <label htmlFor="search" className="form-label text-white">
      Pesquisar Personagem
    </label>
    <input 
      id="search"
      type="text" 
      value={query} 
      onChange={onChange}
      placeholder="Digite o nome do personagem..." 
      className="form-control mb-3"
      aria-label="Campo de busca de personagens"
    />
    {query && (
      <p className={styles.result_count}>
        {resultCount} {resultCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}
      </p>
    )}
  </div>
);




export default function Personagens() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedPersonagem, setSelectedPersonagem] = useState(null);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchPersonagens = async () => {
    try {
      //timeout de 15 seg
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(
        "https://api-marvel-rivals.onrender.com/personagens",
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if(!response.ok){
        throw new Error("Erro ao carregar");
      }

      const data = await response.json();
      setPersonagens(data);
      setLoading(false);
    }catch(err){
      if (err.name === 'AbortError'){
        setError("API demorou muito");
      }else{
        setError(err.message);
      }
      setLoading(false);
    }
  };
  fetchPersonagens();
}, []);

const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSelectedPersonagem(null);
  };

  const handleCardClick = (personagem) => {
    setSelectedPersonagem(personagem);
  };

  const handleCloseModal = () => {
    setSelectedPersonagem(null);
  };
  if (loading) return <Loading />

  if (error) {
    return (
      <div className={styles.loading_container}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2 style={{ color: '#e23636', marginBottom: '20px' }}>😕 Ops!</h2>
          <p style={{ marginBottom: '20px' }}>Erro ao carregar personagens: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#e23636',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#ff4444'}
            onMouseOut={(e) => e.target.style.background = '#e23636'}
          >
            🔄 Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const filteredItems = getFilteredItems(query, personagens);

  return (

    <div className={styles.page_container}>
      <div className={styles.page_content}>

        {/*header */}
        <div className={styles.header}>
          <h1>Personagens Marvel Rivals</h1>
          <p>Veja a lista completa de heróis e vilões jogáveis em Marvel Rivals.</p>
        </div>

        {/*barra de pesquisa */}
        <SearchBar
          query={query}
          onChange={handleSearchChange}
          resultCount={filteredItems.length}
        />

        {/*detalhes do personagem */}
       <PersonagemModal
        personagem={selectedPersonagem}
        onClose={handleCloseModal}
      />
        
      
    {/*cards dos personagens */}
        <section className={styles.cards_section}>
          <h2>Todos os personagens</h2>

          {filteredItems.length > 0 ? (
            <div className={styles.cards_container}>
              {filteredItems.map((personagem) => (
                <PersonagemCard
                  key={personagem.id}
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
