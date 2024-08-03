// pages/interface/components/SearchBox/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBox.module.css';

// Função para salvar o termo de pesquisa no localStorage
const salvarTermoDePesquisa = (termo) => {
  localStorage.setItem('ultimoTermoDePesquisa', termo);
};

// Função para carregar o termo de pesquisa do localStorage
const carregarTermoDePesquisa = () => {
  return localStorage.getItem('ultimoTermoDePesquisa') || '';
};

export default function SearchBox() {
  const [termoDePesquisa, setTermoDePesquisa] = useState(carregarTermoDePesquisa());
  const router = useRouter();

  // Função para lidar com a mudança de termo de pesquisa
  const handlePesquisaChange = (event) => {
    setTermoDePesquisa(event.target.value);
  };

  // Função para lidar com a submissão do formulário de pesquisa
  const handlePesquisaSubmit = (event) => {
    event.preventDefault();
    salvarTermoDePesquisa(termoDePesquisa);
    router.push(`/pesquisar?query=${termoDePesquisa}`);
  };

  return (
    <form className={styles.searchBox} onSubmit={handlePesquisaSubmit}>
      <input
        type="text"
        value={termoDePesquisa}
        onChange={handlePesquisaChange}
        placeholder="Pesquisar..."
        className={styles.searchInput} />
      <button type="submit" className={styles.searchButton}>Pesquisar</button>
    </form>
  );
}
