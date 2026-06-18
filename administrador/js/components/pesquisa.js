import { criarEl } from '../utils/dom.js';

export function criarSecaoPesquisa(aoPesquisar, aoClicarAdicionar) {
  const containerPesquisa = criarEl('div', 'containerPesquisa');
  
  const pesquisaDiv = criarEl('div', 'pesquisa');
  const h2 = criarEl('h2', '', 'Pesquisar');
  
  const containerInput = criarEl('div', 'containerInputPesquisa');
  const input = criarEl('input');
  input.type = 'text';
  
  const itensPesquisa = criarEl('div', 'itensPesquisa');
  const iconeLupa = criarEl('i', 'fa-solid fa-magnifying-glass');
  const iconeX = criarEl('i', 'fa-solid fa-x');

  iconeLupa.addEventListener('click', () => aoPesquisar(input.value));
  iconeX.addEventListener('click', () => {
    input.value = '';
    aoPesquisar('');
  });

  const btnAdicionar = criarEl('button', '', 'Adicionar');
  btnAdicionar.id = 'btnAdicionar';
  btnAdicionar.addEventListener('click', aoClicarAdicionar);

  itensPesquisa.append(iconeLupa, iconeX);
  containerInput.append(input, itensPesquisa);
  pesquisaDiv.append(h2, containerInput);
  containerPesquisa.append(pesquisaDiv, btnAdicionar);

  return containerPesquisa;
}