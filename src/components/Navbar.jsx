import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ personagens: [], jogadores: []});
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsActive(!isActive);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if(!isSearchOpen){
      setSearchQuery("");
      setSearchResults({ personagens: [], jogadores: [] });
    }
  };

  //busca com debounce
  useEffect(() => {
    if(searchQuery.length < 2){
      setSearchResults({ personagens: [], jogadores: [] });
      return;
    }
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try{
        //busca personagens
        const personagensRes = await fetch("https://api-marvel-rivals.onrender.com/personagens/");
        const personagensDados = await personagensRes.json();
        const personagensFiltrados = personagensDados.filter(p =>
          p.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // busca de jogadores 
        const jogadoresRes = await fetch("https://api-marvel-rivals.onrender.com/jogadores/");
        const jogadoresDados = await jogadoresRes.json();
        const jogadoresFiltrados = jogadoresDados.filter(j =>
          j.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults({
          personagens: personagensFiltrados.slice(0, 5),//5 resultados
          jogadores: jogadoresFiltrados.slice(0, 5) 
        });
      }catch(error){
        console.error("Erro na busca:", error);
      }finally{
        setLoading(false);
      }
    }, 500); //espesra 500 ms dps de parar de digitar

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleResultClick = (type, item) => {
    if(type === 'personagem'){
      navigate('/personagens', {state: {selectedPersonagem: item}});
    }else if (type === 'jogador'){
      navigate('/jogador', {state: {selectedJogador: item}});
    }
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchResults.personagens.length > 0) {
      handleResultClick('personagem', searchResults.personagens[0]);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <Link to="/" className={styles.navbar__links2}>
          MARVEL RIVALS
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
          {/*botao de busca */}
          <li className={styles.navbar__item} ref={searchRef}>
            {!isSearchOpen ? (
              <button className={`${styles.navbar__links} ${styles.search_button}`}
              onClick={toggleSearch}>Buscar</button>
            ): (
              <div className={styles.search_container}>
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Digite o nome..."
                  className={styles.search_input}
                  autoFocus
                />
                <button 
                  className={styles.close_search}
                  onClick={toggleSearch}
                >
                  ✕
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Resultados abaixo da navbar */}
      {isSearchOpen && searchQuery.length >= 2 && (
        <div className={styles.search_results_overlay}>
          <div className={styles.search_results_container}>
            {loading ? (
              <div className={styles.search_loading}>
                <div className={styles.spinner_small}></div>
                <span>Buscando...</span>
              </div>
            ) : (
              <>
                {/* Personagens */}
                {searchResults.personagens.length > 0 && (
                  <div className={styles.result_section}>
                    <h4>Personagens</h4>
                    {searchResults.personagens.map((personagem) => (
                      <div 
                        key={personagem.id} 
                        className={styles.result_item}
                        onClick={() => handleResultClick('personagem', personagem)}
                      >
                        <span className={styles.result_icon}></span>
                        <div className={styles.result_info}>
                          <strong>{personagem.nome}</strong>
                          <small>{personagem.afilicao_principal}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Jogadores */}
                {searchResults.jogadores.length > 0 && (
                  <div className={styles.result_section}>
                    <h4>Jogadores</h4>
                    {searchResults.jogadores.map((jogador) => (
                      <div
                        key={jogador.id}
                        className={styles.result_item}
                        onClick={() => handleResultClick('jogador', jogador)}
                      >
                        <span className={styles.result_icon}></span>
                        <div className={styles.result_info}>
                          <strong>{jogador.nome}</strong>
                          <small>{jogador.ranque}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sem resultados */}
                {searchResults.personagens.length === 0 && 
                 searchResults.jogadores.length === 0 && (
                  <div className={styles.no_results}>
                    <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}