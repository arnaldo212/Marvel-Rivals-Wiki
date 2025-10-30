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

export default function Personagens() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedPersonagem, setSelectedPersonagem] = useState(null);



  useEffect(() => {
    //chamada da api
    fetch("https://api-marvel-rivals.onrender.com/personagens")
    .then(response => response.json())//converte o retorno para json
    .then(d => {
      //console.log(d);
      setPersonagens(d);
      setLoading(false);
    })
    .catch(error => {
      console.error("Erro ao buscar dados:", error);
      setLoading(false);
    });
  }, []);//[] roda so uma vez quando o componenete for montado
  
  if (loading){
    //return<p>Carregando...</p>
    return(
      <div className={styles.loading_container}>
        <div className={styles.spinner}></div>
        <p>Carregando personagens...</p>
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
        <div className={styles.search_section}>
          <label htmlFor="search" className="form-label text-white">
            Pesquisar Personagem
          </label>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedPersonagem(null)//limpa seleção ao digitar
            }}
            placeholder="Digite o nome do personagem..." 
            className="form-control mb-3"
          />
          {query && (
            <p className={styles.result_count}>
              {filteredItems.length} {filteredItems.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          )}
        </div>

        {/*lista de resultados da busca */}
        {query && filteredItems.length > 0 && (
          <div className={styles.search_results}>
            <h3>Resultados da busca:</h3>
            {/*<ul className="list-group">
              {filteredItems.map(value => (
                <li key={value.id}
                    className="list-group-item bg-dark text-white mb-1"
                    onClick={() => setSelectedPersonagem(value)}
                    style={{cursor: "pointer"}}
                  >
                    <strong>{value.nome}</strong>
                </li>
              ))}
            </ul>*/}
          </div>
        )}

        {/*detalhes do personagem */}
        {selectedPersonagem && (
          <div className={styles.modal_overlay} onClick={() => setSelectedPersonagem(null)}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.close_button}
                onClick={() => setSelectedPersonagem(null)}
              >
                ×
              </button>
              
              <div className={styles.modal_header}>
                <h2>{selectedPersonagem.nome}</h2>
              </div>

              <div className={styles.modal_body}>
                {selectedPersonagem.descricao && (
                  <div className={styles.info_section}>
                    <h3>📖 Descrição</h3>
                    <p>{selectedPersonagem.descricao}</p>
                  </div>
                )}

                <div className={styles.info_grid}>
                  {selectedPersonagem.dificuldade && (
                    <div className={styles.info_box}>
                      <h4>⚡ Dificuldade</h4>
                      <p>{selectedPersonagem.dificuldade}</p>
                    </div>
                  )}

                  {selectedPersonagem.afilicao_principal && (
                    <div className={styles.info_box}>
                      <h4>🛡️ Afiliação</h4>
                      <p>{selectedPersonagem.afilicao_principal}</p>
                    </div>
                  )}

                  {selectedPersonagem.papel && (
                    <div className={styles.info_box}>
                      <h4>🎯 Papel</h4>
                      <p>{selectedPersonagem.papel}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      
        
      
    {/*cards dos personagens */}
        <div className={styles.cards_section}>
          <h2>Todos os Personagens</h2>
          <div className={styles.cards_container}>
            {filteredItems.map((personagem) => (
              <div 
                key={personagem.id} 
                className={styles.card}
                onClick={() => setSelectedPersonagem(personagem)}
                style={{
                  backgroundImage: `url(${getPersonagemImagem(personagem.nome)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className={styles.card_overlay}>
                  <div className={styles.card_content}>
                    <h3>{personagem.nome}</h3>
                    <p>{personagem.papel || 'Herói'}</p>
                    {personagem.dificuldade && (
                      <span className={styles.difficulty_badge}>
                        {personagem.dificuldade}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className={styles.no_results}>
              <p>Nenhum personagem encontrado com "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
}
