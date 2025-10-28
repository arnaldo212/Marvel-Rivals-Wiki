import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
// Componentes
import Navbar from "./components/Navbar";

// Páginas
import Home from "./pages/Home";
import Personagens from "./pages/Personagens";
import Buscar from "./pages/Buscar";
import Estatisticas from "./pages/Estatisticas";
import Ranking from "./pages/Ranking";
import Jogador from "./pages/Jogador";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personagens" element={<Personagens />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/jogador" element={<Jogador />} />
      </Routes>
    </Router>
  );
}

export default App;
