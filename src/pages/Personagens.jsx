import React, {useEffect, useState} from "react";
import styles from "./Personagens.module.css";

const getFilteredItems = (query, personagens)=> {
  if(!query){
    return personagens;
  }
  return personagens.filter(personagem => personagem.nome.includes(query))
};

export default function Personagens() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");



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
    <>
    <div className={styles.page_container}>
      <label>Pesquisar teste</label>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Digite o nome do personagem"/>
      <ul>
        {filteredItems.map(value => <h1 key={value.id}>{value.nome}</h1>)}
      </ul>
    </div>

    <div className={styles.page_container}>
      <div className={styles.page_content}>
        <h1> Personagens</h1>
        <p>Veja a lista completa de heróis e vilões jogáveis em Marvel Rivals.</p>
      </div>
      <div className={styles.page_content}>
        <h1>personagens teste</h1>
        <ul>{personagens.map((d, index) => (
          <li key={index}>{d.nome}</li>
          ))}
          </ul>
      </div>
    </div>
    </>
  );
}
