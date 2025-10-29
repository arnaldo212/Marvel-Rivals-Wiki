import React, {useEffect, useState} from "react";
import styles from "./Personagens.module.css";

const getFilteredItems = (query, personagens)=> {
  if(!query){
    return [];
  }
  return personagens.filter(personagem => personagem.nome.includes(query))
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
    return<p>Carregando...</p>
  }
    const filteredItems = getFilteredItems(query, personagens);

  return (

    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <label htmlFor="search" className="form-label text-white">Pesquisar</label>
        <input type="text" value={query} onChange={(e) => {
          setQuery(e.target.value);
          setSelectedPersonagem(null)//limpa sleção ao digitar
        }}
        placeholder="Digite o nome do personagem" className="form-control mb-3"/>
        
        <ul className="list-group">
          {filteredItems.map(value => (
            <li key={value.id}
                className="list-group-item bg-dark text-white mb-1"
                onClick={() => setSelectedPersonagem(value)}
                style={{cursor: "pointer"}}
              >
                <strong>{value.nome}</strong>
            </li>
          ))}
        </ul>
        <h1> Personagens</h1>
        <p>Veja a lista completa de heróis e vilões jogáveis em Marvel Rivals.</p>
      </div>
      <div className={styles.page_content}>
      </div>
      {selectedPersonagem && (

      <div className={`${styles.page_content} ${styles.detail_box}`}>
        
        <h2>{selectedPersonagem.nome}</h2>
        <p><strong>Descrição:</strong> {selectedPersonagem.descricao}</p>
        <p><strong>Dificuldade:</strong> {selectedPersonagem.dificuldade}</p>
        <p><strong>Afiliação:</strong> {selectedPersonagem.afilicao_principal}</p>

        <h1>personagens teste</h1>
        <ul className="list-group">{personagens.map((d, index) => (
          <li key={index}>{d.nome}</li>
          ))}
          </ul>
      </div>
      )}
    </div>
  );
}
